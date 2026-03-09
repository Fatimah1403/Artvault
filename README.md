# ArtVault

A museum-quality art explorer web app powered by the [Art Institute of Chicago (ARTIC)](https://api.artic.edu) public API. Browse thousands of artworks, search by keyword, explore by department, and dive deep into artwork and artist details.

---

##  Live Demo

> Run locally following the setup instructions below.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| API | ARTIC Public API (free, no key required) |

---

##  Project Structure
```
artvault/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Navbar, ArtworkCard, SearchBar, SkeletonCard, ErrorMessage
│   │   ├── pages/           # Home, Search, Browse, ArtworkDetail, ArtistDetail
│   │   ├── utils/           # api.js — all API calls + image URL helper
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── server.js             # Express server entry point
│   └── routes/
│       └── artic.js         # Proxy routes to ARTIC API
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed before running the app:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- Git

Verify by running:
```bash
node --version
npm --version
```

---

##  Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Fatimah1403/Artvault.git
cd artvault
```

### 2. Start the Express server
```bash
cd server
npm install
node server.js or npm run dev
```

> Server runs on **http://localhost:5000**

### 3. Start the React frontend (new terminal tab)
```bash
cd client
npm install
npm run dev
```

> App runs on **http://localhost:5173**

### 4. Open in your browser
```
http://localhost:5173
```

---

## 🔌 API Endpoints

All requests are proxied through the Express server to the ARTIC API.

| Method | Route | Description |
|---|---|---|
| GET | `/api/artworks` | Paginated artwork browsing |
| GET | `/api/artworks/search?q=` | Search artworks by keyword |
| GET | `/api/artworks/:id` | Single artwork detail |
| GET | `/api/artists/:id` | Artist bio and info |
| GET | `/api/departments` | All museum departments |

**Base API:** `https://api.artic.edu/api/v1` — No API key required.

---

##  Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero search + featured artworks |
| `/search` | Search | Keyword search with results grid |
| `/browse` | Browse | Filter artworks by department |
| `/artwork/:id` | Artwork Detail | Full image, metadata, description |
| `/artist/:id` | Artist Detail | Bio, dates, and related works |

---

##  Features

- Keyword search with empty input and no-results error handling
- Browse artworks by museum department
- High-resolution artwork images via ARTIC IIIF image server
- Artist detail pages with biography and related works
- Skeleton loading states for smooth perceived performance
- Fully responsive — mobile, tablet, and desktop
- Dark museum-quality UI with gold accent design system
- ↩️ Browser history navigation (Back button works correctly)

---

##  Testing the App

### Test server endpoints directly in browser:
```
http://localhost:5000/api/artworks
http://localhost:5000/api/artworks/search?q=monet
http://localhost:5000/api/artworks/27992
http://localhost:5000/api/artists/40610
http://localhost:5000/api/departments
```
## Video Demo
<div style="position: relative; padding-bottom: 64.55089820359281%; height: 0;"><iframe src="https://www.loom.com/embed/f25212174ab04ace8720435319296cb3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Manual test checklist:
- [ ] Home page loads with 8 featured artwork cards
- [ ] Searching from hero navigates to `/search?q=...`
- [ ] Empty search shows inline validation error
- [ ] Invalid search term shows no-results error message
- [ ] Clicking an artwork card opens the detail page
- [ ] Artwork detail shows image, title, artist, date, medium, dimensions
- [ ] Clicking artist name navigates to artist detail page
- [ ] Artist page shows bio and related works grid
- [ ] Browse page shows department filter chips
- [ ] Selecting a department filters the artwork grid
- [ ] Load More button appends more artworks
- [ ] Back button returns to previous page correctly
- [ ] App is usable on a mobile screen width

---

##  Security Notes

- No API keys are used or required — ARTIC is a fully public API
- The Express server acts as a proxy, keeping backend logic separate from the frontend
- No `.env` file is needed for this project

---

##  License

© 2026 Fatimah Hassan. Artwork data and images provided by the [Art Institute of Chicago](https://www.artic.edu/) under their open access policy.