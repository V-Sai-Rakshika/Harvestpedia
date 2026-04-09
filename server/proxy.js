const https = require("https");
require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  next();
});
app.use(express.json());

// ── Rate limiter ───────────────────────────────────────────
const rateLimitMap = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60_000;
  const maxReqs = 20;
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) { entry.count = 0; entry.start = now; }
  entry.count++;
  rateLimitMap.set(ip, entry);
  if (entry.count > maxReqs) return res.status(429).json({ error: "Too many requests." });
  next();
}

// ── Groq ───────────────────────────────────────────
app.post("/api/claude", rateLimit, (req, res) => {
  const { prompt, system, max_tokens = 1000 } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  const fullPrompt = system ? `${system}\n\n${prompt}` : prompt;
  const body = JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: fullPrompt }],
    max_tokens: max_tokens
  });

  const options = {
    hostname: "api.groq.com",
    path: "/openai/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Length": Buffer.byteLength(body)
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = "";
    apiRes.on("data", chunk => data += chunk);
    apiRes.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        if (apiRes.statusCode !== 200) {
          console.error("Groq error:", apiRes.statusCode, data);
          return res.status(400).json({ error: "Groq API error", detail: data });
        }
        const text = parsed.choices?.[0]?.message?.content || "";
        res.json({ result: text });
      } catch (e) {
        res.status(500).json({ error: "Parse error", detail: e.message });
      }
    });
  });

  apiReq.on("error", (e) => {
    console.error("Request error:", e.message);
    res.status(500).json({ error: "Request failed", detail: e.message });
  });

  apiReq.write(body);
  apiReq.end();
});

// ── Weather ────────────────────────────────────────────────
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
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Weather API error" });
  }
});

// ── Health ─────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});