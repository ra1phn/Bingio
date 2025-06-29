const API_URL = "https://api.tvmaze.com/shows";

const showGrid = document.getElementById("showGrid");
const categoryList = document.getElementById("categoryList");
const detailView = document.getElementById("show-detail-view");
const appContainer = document.querySelector(".app-container");

// Detail references
const titleEl = document.getElementById("detailTitle");
const genresEl = document.getElementById("detailGenres");
const summaryEl = document.getElementById("detailSummary");
const ratingEl = document.getElementById("ratingBadge");
const trailerBtn = document.getElementById("trailerBtn");
const officialBtn = document.getElementById("officialBtn");
const castListEl = document.getElementById("castList");

const searchInput = document.getElementById("searchInput");

let allShows = [];

// ========== Fetch Shows ==========
async function fetchShows() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allShows = data.slice(0, 100);
    renderShows(allShows);
  } catch (err) {
    console.error("Failed to fetch shows:", err);
  }
}

// ========== Render Shows ==========
function renderShows(shows) {
  showGrid.innerHTML = "";
  shows.forEach(show => {
    const card = document.createElement("div");
    card.className = "card";
    const imgSrc = show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image";
    const genres = show.genres && show.genres.length ? show.genres.join(', ') : "No genres";
    card.innerHTML = `
      <img src="${imgSrc}" alt="${show.name}" />
      <h4>${show.name}</h4>
      <p>${genres}</p>
    `;
    card.addEventListener("click", () => showDetails(show));
    showGrid.appendChild(card);
  });
}

// ========== Show Details ==========
async function showDetails(show) {
  detailView.style.backgroundImage = `url(${show.image?.original || ""})`;
  detailView.classList.remove("hidden");
  detailView.classList.add("show");
  appContainer.style.display = "none";

  titleEl.textContent = show.name;
  genresEl.textContent = show.genres && show.genres.length ? show.genres.join(', ') : "No genres";
  summaryEl.innerHTML = show.summary || "No summary available.";
  ratingEl.textContent = show.rating?.average || "N/A";

  const trailerSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(show.name + ' trailer')}`;
  trailerBtn.href = trailerSearch;
  officialBtn.href = show.officialSite || show.url;

  // Fetch cast
  try {
    const castRes = await fetch(`https://api.tvmaze.com/shows/${show.id}/cast`);
    const castData = await castRes.json();
    const castNames = castData
      .map(member => member?.person?.name || member?.actor?.name)
      .filter(Boolean)
      .slice(0, 5)
      .join(', ');
    castListEl.innerHTML = `<strong>Main Cast:</strong> ${castNames || "N/A"}`;
  } catch (err) {
    castListEl.textContent = "Main Cast: N/A";
  }
}

// ========== Back Button ==========
document.getElementById("backButton").addEventListener("click", () => {
  detailView.classList.add("hidden");
  detailView.classList.remove("show");
  appContainer.style.display = "flex";
});

// ========== Genre Filter ==========
categoryList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const genre = e.target.innerText;
    document.querySelectorAll("#categoryList li").forEach(li => li.classList.remove("active"));
    e.target.classList.add("active");

    const filtered = genre === "All" ? allShows : allShows.filter(show => show.genres.includes(genre));
    renderShows(filtered);
  }
});

// ========== Search Filter ==========
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allShows.filter(show => show.name.toLowerCase().includes(searchTerm));
  renderShows(filtered);
});

// ========== Init ==========
fetchShows();
