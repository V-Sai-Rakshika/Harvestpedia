// ============================================================
// Harvestpedia – Shared API Helper (js/api.js)
// ============================================================
// Include this in ALL pages:
//   <script src="../js/api.js"></script>
//
// Replace ANY existing direct Claude fetch() calls with:
//   const text = await HP.claude(prompt, system);
//
// Replace weather fetch() calls with:
//   const data = await HP.weather({ lat, lon });
// ============================================================

const HP = (() => {
  // ── Config ────────────────────────────────────────────────
  // Point to your proxy in production; falls back to direct in
  // local dev ONLY if you set a temporary key (not recommended).
  const PROXY_BASE = "http://localhost:3001";

  // ── Cache ─────────────────────────────────────────────────
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour

  function cacheGet(key) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const { value, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(key); return null; }
      return value;
    } catch { return null; }
  }

  function cacheSet(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ value, ts: Date.now() }));
    } catch { /* storage full – ignore */ }
  }

  // ── Claude proxy call ─────────────────────────────────────
  async function claude(prompt, system = "") {
    const cacheKey = "hp_claude_" + btoa(encodeURIComponent(prompt)).slice(0, 60);
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const res = await fetch(`${PROXY_BASE}/api/claude`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, system, max_tokens: 1200 }),
    });

    if (!res.ok) throw new Error(`Claude proxy error: ${res.status}`);
    const { result } = await res.json();
    cacheSet(cacheKey, result);
    return result;
  }

  // ── Weather proxy call ────────────────────────────────────
  async function weather({ lat, lon, city } = {}) {
    const cacheKey = `hp_weather_${lat || city}_${lon || ""}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const params = new URLSearchParams(
      lat && lon ? { lat, lon } : { city }
    );
    const res = await fetch(`${PROXY_BASE}/api/weather?${params}`);
    if (!res.ok) throw new Error("Weather proxy error");
    const data = await res.json();
    cacheSet(cacheKey, data);
    return data;
  }

  // ── Favorites helpers (unified across modules) ────────────
  const FAVE_KEYS = {
    fruits: "hp-fruit-favs",
    vegetables: "hp-veg-favs",
    plants: "hp-plant-favs",
  };

  function getFaves(module) {
    try { return JSON.parse(localStorage.getItem(FAVE_KEYS[module]) || "[]"); }
    catch { return []; }
  }

  function toggleFave(module, id) {
    const favs = getFaves(module);
    const idx = favs.indexOf(id);
    idx === -1 ? favs.push(id) : favs.splice(idx, 1);
    localStorage.setItem(FAVE_KEYS[module], JSON.stringify(favs));
    return idx === -1; // returns true if now favorited
  }

  function isFave(module, id) {
    return getFaves(module).includes(id);
  }

  return { claude, weather, getFaves, toggleFave, isFave };
})();