# ⚡ DEV SPEED MATRIX — Internet Speed Testing Website (Render-ready)

Ek complete speed test website: **Download, Upload, Ping, Jitter** — live animated gauge ke saath.
Backend **pure Node.js** hai (koi npm dependency nahi ✅), frontend vanilla HTML/CSS/JS.

```
dev-speed-matrix/
├── server.js          # Node.js server (ping / download / upload API)
├── public/
│   └── index.html     # Pura frontend (single file — CSS + JS inline)
├── render.yaml        # Render Blueprint (auto-configuration)
├── package.json       # npm start → node server.js
└── .gitignore
```

---

## 🖥️ Local testing

```bash
cd dev-speed-matrix
npm start          # ya: node server.js
```

Browser me kholo: http://localhost:3000

---

## 🚀 Render par deploy (5 minute)

### Tarika 1 — GitHub se (recommended)

1. GitHub par **naya repository** banao (e.g. `dev-speed-matrix`)
2. Ye folder usme push karo:
   ```bash
   cd dev-speed-matrix
   git init
   git add .
   git commit -m "DEV SPEED MATRIX — speed test website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/dev-speed-matrix.git
   git push -u origin main
   ```
3. [render.com](https://render.com) par jao → **GitHub se login** karo
4. **New + → Web Service** → apna `dev-speed-matrix` repo connect karo
5. Settings:
   | Setting | Value |
   |---|---|
   | Runtime | **Node** |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |
   | Region | **Singapore** (India ke users ke liye best = accurate result) |
6. **Create Web Service** dabao → ~2 min me site live:
   `https://dev-speed-matrix.onrender.com` 🎉

### Tarika 2 — Blueprint (render.yaml)

`render.yaml` folder me already hai. Render par **New + → Blueprint** choose karo,
repo select karo — saari settings auto apply ho jayengi.

---

## 🧠 Kaam kaise karta hai?

| Phase | Kya hota hai |
|---|---|
| **Ping** | 12 chhote requests — median latency + jitter (variation) nikaalta hai |
| **Download** | Server `/api/download` se random data stream karta hai — **4 parallel connections, 10 second** |
| **Upload** | Browser server ko random data POST karta hai — **3 parallel connections, 10 second** |

Result **Mbps** me hai (megabits per second — jaise Jio/Airtel plans me dikhta hai).

---

## ⚠️ Render Free Plan — dhyan rakho

- **Sleep:** 15 minute idle ke baad app so jata hai. Pehli request par
  ~30–50 sec lag sakte hain (cold start). Iske baad sab normal.
- **Bandwidth:** Free tier me ~100 GB/month data. Har speed test ~30–100 MB
  use karta hai, to roughly **1,000–3,000 tests/month** free me aa jayenge.
- **Accuracy:** Speed test ka result server ki location par depend karta hai —
  Indian users ke liye region **Singapore** rakho (kam latency = sahi result).
- CPU/network free instances me shared hai — bahut saare users ek saath test
  karein to thoda affect ho sakta hai.

---

## 🔧 Customize karna ho to

- **Test duration:** `index.html` me `downloadTest(10000, 4)` / `uploadTest(10000, 3)`
  — pehla number milliseconds, doosra parallel connections
- **Colors/theme:** `<style>` section me CSS variables (`--cyan`, `--violet`…)
- **Naam/title:** `<h1>` aur `<title>` badlo
