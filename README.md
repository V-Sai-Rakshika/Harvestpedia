# 🌿 Harvestpedia

> **Your complete plant-based knowledge platform** — explore fruits, vegetables, herbs, their nutritional profiles, health benefits, seasonal guides, and AI-powered recipes.

🌐 **Live Demo:** https://harvestpedia.vercel.app/

![Harvestpedia](<img width="1600" height="900" alt="Screenshot (75)" src="https://github.com/user-attachments/assets/46fad53c-e7d7-4b72-ab69-728845c1a4e0" />)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Setup](#api-setup)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Harvestpedia is a front-end web application that serves as a reference platform for plant-based foods. Users can browse fruits and vegetables, read nutritional data, compare up to 5 items side by side with interactive charts, explore seasonal picks, and generate AI-powered recipes from ingredients they have on hand.

The project is built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools — making it fast, lightweight, and easy to extend.

---

## Features

| Feature | Description |
|---|---|
| **Live Search** | Type-ahead ingredient search with instant results |
| **Fruit & Vegetable Database** | 240+ fruits and 180+ vegetables with detailed profiles |
| **Nutrition Comparator** | Compare up to 5 items with bar charts, radar charts, and a table |
| **Seasonal Guide** | Filter produce by season — Summer, Spring, Autumn, Winter |
| **AI Recipe Generator** | Enter your ingredients and get a personalised recipe via Claude API |
| **Plant & Herb Profiles** | Coverage of 120+ herbs and indoor plants |
| **Responsive Design** | Fully functional on mobile, tablet, and desktop |
| **Consistent Design System** | Shared CSS variables, typography, and component library |

---

## Pages

```
index.html          → Homepage with hero, categories, seasonal picks, explore CTA
fruits.html         → Full fruit catalogue
fruit_detail.html   → Individual fruit profile page
vegetables.html     → Full vegetable catalogue
vegetable_detail.html → Individual vegetable profile page
plants.html         → Herbs and plants catalogue
plant_detail.html   → Individual plant profile page
compare.html        → Side-by-side nutrition comparator (Chart.js)
recipes.html        → AI-powered recipe generator
about.html          → Mission, contributors, contact, privacy policy
nutrition.html      → Educational nutrition facts page
health.html         → Educational health benefits page
seasonal.html       → Full seasonal calendar
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Charts | [Chart.js 4.4](https://www.chartjs.org/) |
| Fonts | Google Fonts — Playfair Display + DM Sans |
| Images | Unsplash + iStockphoto (CDN) |
| AI | Anthropic Claude API (recipes feature) |

No frameworks. No bundlers. No dependencies beyond Chart.js.

---

## Project Structure

```
harvestpedia/
├── index.html
├── fruits.html
├── fruit_detail.html
├── vegetables.html
├── vegetable_detail.html
├── plants.html
├── plant_detail.html
├── compare.html
├── recipes.html
├── about.html
├── nutrition.html
├── health.html
├── seasonal.html
│
├── css/
│   └── style.css          ← shared design system
│
├── js/
│   ├── searchIndex.js     ← search data for live lookup
│   └── api.js             ← Claude API proxy helper
│
└── assets/
    └── (local images if any)
```

---

## Getting Started

Harvestpedia is a static site. No build step required.

### Option 1 — Open directly
```bash
# Clone the repo
git clone https://github.com/V-Sai-Rakshika/harvestpedia.git
cd harvestpedia

# Open in browser
open index.html
```

### Option 2 — Local server (recommended for API features)
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Then open
http://localhost:8000
```

---

## API Setup

The AI Recipe Generator uses the Anthropic Claude API through a lightweight proxy (`js/api.js`).

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Set up a proxy server or use Anthropic's direct API
3. Update `js/api.js` with your endpoint

> **Note:** Never expose your API key directly in client-side JavaScript in production. Use a server-side proxy.

---

## Roadmap

- [ ] User accounts and saved favourites
- [ ] Grow-at-Home guides with location-based weather data
- [ ] Full seasonal calendar (month-by-month view)
- [ ] Dark mode support
- [ ] PWA / offline support
- [ ] Multi-language support
- [ ] Nutrient calculator (daily intake tracker)
- [ ] Admin CMS for adding new produce entries

---

## Contributing

Contributions are welcome. If you'd like to add produce entries, fix data, improve styles, or suggest features:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

Please keep code style consistent with the existing codebase (vanilla JS, CSS variables, no frameworks).

---

## License

MIT License — free to use, modify, and distribute with attribution.

---

<p align="center">
  Made with 🌿 for nature lovers · Built with vanilla HTML, CSS & JS
</p>
