# 🎬 Bingio 

Bingio is a sleek and responsive Single Page Application (SPA) that lets users browse TV shows fetched from the [TVmaze API](https://www.tvmaze.com/api). It offers genre filtering, live search, and a rich detail view for each show.

---

## 🧩 Features

- 🎥 **Top 100 TV Shows** from the TVmaze API
- 🎭 **Genre Filtering** – Choose from popular categories
- 🔍 **Live Search** – Instant results as you type
- 🖼️ **Show Details** – Poster background, summary, rating, cast
- 📺 **Watch Trailer** – YouTube trailer lookup
- 🌐 **Official Site** – Visit the show’s official webpage
- 👨‍👩‍👧‍👦 **Main Cast** – Actor names listed (no character names or photos)
- 📱 **Responsive Design** – Sidebar moves to bottom on mobile

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3** (Responsive, Flexbox, Grid, Media Queries)
- **JavaScript (ES6)**
- **TVmaze REST API**
- **Google Fonts** (`Poppins`, `Dancing Script`)

---

## 📁 File Structure

```
.
├── index.html
├── style.css
├── index.js
└── README.md
```

---

## 🔄 How It Works

1. Fetches data from the TVmaze API and displays the top 100 shows.
2. Genre filter matches the show's actual genre array from the API.
3. Clicking a show displays a full-page detail overlay.
4. Trailer button leads to YouTube search.
5. Official site button links to the real show site.
6. Cast section fetches and displays actor names (first 5).

---

## 📱 Mobile Layout

- Sidebar moves to the **bottom**
- Genre buttons turn into **horizontal pills**
- Extra bottom padding for comfortable browsing

---

## 📦 API Reference

- **Get all shows**: `https://api.tvmaze.com/shows`
- **Get cast for a show**: `https://api.tvmaze.com/shows/{id}/cast`

---

## 🚀 Live Demo 

Link: [Click here to view live Demo video](https://drive.google.com/file/d/1aH4E3ANlnkQLDg1Ds2iGbp9cj2kWMc4i/view?usp=sharing)

---

## 📊 PowerPoint Presentation

Link: [Click here to view presentation](https://docs.google.com/presentation/d/1vYFr1oIzFs98lqbM00YLBgPlOIb4cFdo/edit?usp=sharing&ouid=104772813761479379398&rtpof=true&sd=true)

## 🧠 Author

**Ralph Njuguna**  

---

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).