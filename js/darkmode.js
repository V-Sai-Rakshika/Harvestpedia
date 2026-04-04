/* ============================================================
   Harvestpedia – Dark Mode  (js/darkmode.js)
   ============================================================
   1. Add this to the <head> of EVERY page (before your CSS):
      <script src="../js/darkmode.js"></script>

   2. Add the toggle button somewhere in your navbar HTML:
      <button class="dm-toggle" id="dm-toggle" title="Toggle dark mode"></button>

   3. Add dark mode CSS overrides to your style.css (see bottom
      of this file for the recommended variables block).
   ============================================================ */

(function () {
  const KEY   = "hp-dark-mode";
  const ROOT  = document.documentElement;
  const LIGHT = "light";
  const DARK  = "dark";

  // Apply theme as early as possible to prevent flash
  function applyTheme(theme) {
    ROOT.setAttribute("data-theme", theme);
    ROOT.classList.toggle("dark", theme === DARK);
    localStorage.setItem(KEY, theme);
  }

  // Resolve initial theme: stored > system preference > light
  const stored = localStorage.getItem(KEY);
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
  applyTheme(stored || system);

  // After DOM ready: wire up the toggle button
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("dm-toggle");
    if (!btn) return;

    function updateBtn() {
      const isDark = ROOT.getAttribute("data-theme") === DARK;
      btn.textContent = isDark ? "☀️" : "🌙";
      btn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
      btn.setAttribute("aria-label", btn.title);
    }

    btn.addEventListener("click", () => {
      const next = ROOT.getAttribute("data-theme") === DARK ? LIGHT : DARK;
      applyTheme(next);
      updateBtn();
    });

    updateBtn();
  });

  // Listen for system preference changes (if user has no stored pref)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem(KEY)) {
      applyTheme(e.matches ? DARK : LIGHT);
    }
  });
})();

/* ============================================================
   PASTE THIS INTO YOUR style.css
   ============================================================

:root {
  --bg-primary:    #ffffff;
  --bg-secondary:  #f5f9f0;
  --bg-card:       #ffffff;
  --text-primary:  #1a3a1a;
  --text-muted:    #6b7280;
  --border-color:  #e5e7eb;
  --navbar-bg:     rgba(255,255,255,0.85);
  --shadow:        0 2px 8px rgba(0,0,0,0.08);
  --accent-green:  #3B6D11;
  --accent-amber:  #BA7517;
}

[data-theme="dark"] {
  --bg-primary:    #111a11;
  --bg-secondary:  #1a2a1a;
  --bg-card:       #1e2d1e;
  --text-primary:  #e8f4e8;
  --text-muted:    #9ca3af;
  --border-color:  #2d4a2d;
  --navbar-bg:     rgba(17,26,17,0.92);
  --shadow:        0 2px 8px rgba(0,0,0,0.4);
  --accent-green:  #5a9e20;
  --accent-amber:  #d48a2a;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.25s, color 0.25s;
}

.navbar {
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
}

.dm-toggle {
  background: none;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--text-primary);
  transition: border-color 0.2s;
}
.dm-toggle:hover { border-color: var(--accent-green); }

============================================================ */