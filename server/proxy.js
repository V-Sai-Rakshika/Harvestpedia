// ============================================================
// Harvestpedia – Secure API Proxy (Node.js / Express)
// ============================================================
// Installation:
//   npm init -y
//   npm install express cors dotenv node-fetch
//
// .env file (create in /server folder):
//   CLAUDE_API_KEY=sk-ant-...
//   WEATHER_API_KEY=your_openweather_key
//   PORT=3001
//
// Run: node proxy.js
// ============================================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Allow requests only from your frontend origin
app.use(
  cors({
    origin: [
      "http://localhost:5500",   // Live Server default
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      // Add your deployed domain here:
      // "https://harvestpedia.yourdomain.com"
    ],
  })
);

// ── Simple in-memory rate limiter ──────────────────────────
const rateLimitMap = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60_000;   // 1 minute window
  const maxReqs = 20;        // max requests per window

  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count++;
  rateLimitMap.set(ip, entry);

  if (entry.count > maxReqs) {
    return res.status(429).json({ error: "Too many requests. Please wait a moment." });
  }
  next();
}

// ── Claude API proxy ───────────────────────────────────────
app.post("/api/claude", rateLimit, async (req, res) => {
  const { prompt, system, max_tokens = 1000 } = req.body;

  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  try {
    const result = await HP.claude("your prompt here", "optional system prompt");

    if (!response.ok) {
      const err = await response.text();
      console.error("Claude API error:", err);
      return res.status(response.status).json({ error: "Claude API error" });
    }

    const data = await response.json();
    const text = data.content?.find((b) => b.type === "text")?.text || "";
    res.json({ result: text });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Weather API proxy ──────────────────────────────────────
app.get("/api/weather", rateLimit, async (req, res) => {
  const { lat, lon, city } = req.query;

  let url;
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  } else {
    return res.status(400).json({ error: "Provide lat/lon or city" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Weather API error" });
  }
});

// ── Health check ───────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`✅ Harvestpedia proxy running on http://localhost:${PORT}`);
});