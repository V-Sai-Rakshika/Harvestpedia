const PROXY_BASE = "https://harvestpedia.onrender.com";

window.HP = {
  // Claude AI
  claude: async (prompt, system = "") => {
  try {
    const res = await fetch(`${PROXY_BASE}/api/claude`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, system })
    });

    const data = await res.json();

    // ✅ FIX: match proxy response
    return data.result;

  } catch (err) {
    console.error("Claude error:", err);
    return null;
  }
},

  // Weather API
  weather: async ({ city, lat, lon }) => {
    try {
      let url = `${PROXY_BASE}/api/weather?`;

      if (city) url += `city=${city}`;
      else if (lat && lon) url += `lat=${lat}&lon=${lon}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) throw new Error(data.error);

      return data.data;
    } catch (err) {
      console.error("Weather error:", err);
      return null;
    }
  }
};