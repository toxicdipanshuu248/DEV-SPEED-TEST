# ⚡ 𝐃𝐄𝐕 𝐒𝐏𝐄𝐄𝐃 𝐌𝐀𝐓𝐑𝐈𝐗 — Internet Speed Testing Website (Render-ready)

A complete speed test website: **Download, Upload, Ping, Jitter** — with a live animated
gauge and a 3D orbiting solar-system background that spins as you scroll. 🌌

- Backend: **pure Node.js** — zero npm dependencies ✅
- Frontend: vanilla HTML/CSS/JS (single file)

```
dev-speed-matrix/
├── server.js          # Node.js server (ping / download / upload API)
├── public/
│   └── index.html     # Full frontend (single file — CSS + JS inline)
├── render.yaml        # Render Blueprint (auto-configuration)
├── package.json       # npm start → node server.js
└── .gitignore
```

---

## 💻 Run locally

```bash
cd dev-speed-matrix
npm start          # or: node server.js
```

Open in browser: http://localhost:3000

---

## 🚀 Deploy on Render (5 minutes)

### Way 1 — Via GitHub (recommended)

1. Create a **new repository** on GitHub (e.g. `dev-speed-matrix`)
2. Push this folder to it:
   ```bash
   cd dev-speed-matrix
   git init
   git add .
   git commit -m "DEV SPEED MATRIX — speed test website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/dev-speed-matrix.git
   git push -u origin main
   ```
3. Go to [render.com](https://render.com) → **sign in with GitHub**
4. **New + → Web Service** → connect your `dev-speed-matrix` repo
5. Settings:
   | Setting | Value |
   |---|---|
   | Runtime | **Node** |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |
   | Region | **Singapore** (best for Indian users = accurate results) |
6. Hit **Create Web Service** → in ~2 minutes your site is live:
   `https://dev-speed-matrix.onrender.com` 🎉

### Way 2 — Blueprint (render.yaml)

`render.yaml` is already in the folder. On Render choose **New + → Blueprint**,
pick the repo — all settings get applied automatically.

---

## 🧠 How it works

| Phase | What happens |
|---|---|
| **Ping** | 12 tiny requests — measures median latency + jitter (variation) |
| **Download** | Server streams random data from `/api/download` — **4 parallel connections, 10 seconds** |
| **Upload** | Browser POSTs random data to the server — **3 parallel connections, 10 seconds** |

Results are in **Mbps** (megabits per second — same unit as Jio/Airtel plans).

Results appear **one by one**: ping → download → upload, right on the same screen.

---

## ⚠️ Render Free Plan — good to know

- **Sleep:** the app sleeps after 15 minutes idle. The first request may take
  ~30–50 seconds (cold start). Everything is normal after that.
- **Bandwidth:** free tier includes ~100 GB/month. Each speed test uses ~30–100 MB,
  so roughly **1,000–3,000 tests/month** are covered for free.
- **Accuracy:** results depend on the server location — for Indian users keep
  region **Singapore** (lower latency = more accurate results).
- CPU/network is shared on free instances — many simultaneous tests may affect results.

---

## 🔧 Customization

- **Test duration:** in `index.html` change `downloadTest(10000, 4)` / `uploadTest(10000, 3)`
  — first number is milliseconds, second is parallel connections
- **Colors/theme:** CSS variables in the `<style>` section (`--cyan`, `--violet`…)
- **Name/title:** edit `<h1>` and `<title>`

---

## 📬 Contact

- **Designed By Dev** 🖤
- Telegram: [t.me/god_olds](https://t.me/god_olds)
- YouTube: [youtube.com/@tech_zone_dev](https://youtube.com/@tech_zone_dev?si=677-fnmuCz9wZTO_)

𝑫𝒆𝒔𝒊𝒈𝒏𝒆𝒅 𝑾𝒊𝒕𝒉 𝑳𝒐𝒗𝒆 💖
