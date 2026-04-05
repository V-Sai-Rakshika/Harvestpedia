# 🌿 Harvestpedia

**Harvestpedia** is a modern web platform to explore fruits, vegetables, and plants — with detailed nutritional data, seasonal insights, and AI-powered recipe generation.

🌐 **Live Demo:** https://harvestpedia.vercel.app/
---

## 🚀 Features

* 🍎 **Explore Fruits, Vegetables & Plants**
  Browse a rich collection of plant-based foods with detailed insights.

* 🔍 **Smart Search System**
  Quickly find items across categories.

* ⚖️ **Compare Foods**
  Compare nutritional values between different fruits and vegetables.

* 📅 **Seasonal Guide**
  Discover what foods are best to consume in each season.

* 🤖 **AI Recipe Generator**
  Generate recipes based on ingredients using AI.

* 📦 **Offline Support (PWA)**
  Service worker enabled for better performance and offline usage.

---

## 🧱 Tech Stack

### Frontend

* HTML, CSS, JavaScript
* LocalStorage (favorites, preferences)
* Service Workers (PWA support)

### Backend

* Node.js
* Express (proxy server for API calls)

### AI Integration

* External AI API via custom proxy (`api.js + proxy.js`)

---

## 📂 Project Structure

```
Harvestpedia/
│
├── index.html
├── fruits.html
├── vegetables.html
├── plants.html
├── recipes.html        # AI recipe feature
├── search.html
├── compare.html
├── seasonal.html
│
├── js/
│   ├── api.js          # API bridge (frontend → backend)
│   ├── darkmode.js     # Theme toggle
│   └── sw.js           # Service worker (PWA)
│
├── data/
│   ├── fruits.json          
│   ├── vegetables.json    
│   └── plants.json           
├── server/
│   ├── proxy.js        # Backend API proxy
│   ├── package.json
│   ├── node_modules/
│   └── .env            # Environment variables (API keys)
│
└── .gitignore
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/harvestpedia.git
cd harvestpedia
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```
API_KEY=your_api_key_here
```

Start the server:

```bash
node proxy.js
```

---

### 3️⃣ Run Frontend

* Open project in **VS Code**
* Right click `index.html`
* Click **Open with Live Server**

---

## 🔗 How It Works

* `api.js` → Sends request from frontend
* `proxy.js` → Handles API securely (hides API key)
* `.env` → Stores sensitive keys safely

---

## 🌟 Key Highlights

* Clean UI with modern animations ✨
* Fully client-side + lightweight backend ⚡
* Scalable structure for future upgrades 🚀
* Beginner → Intermediate level full-stack project 💻

---

## 🔮 Future Improvements

* 🗄️ Database integration (MongoDB / MySQL)
* 👤 User accounts & saved preferences
* 📱 Mobile app version
* 🤖 AI nutrition advisor
* 🌍 Location-based seasonal suggestions

---

## 🤝 Contributions

Suggestions and improvements are welcome!
