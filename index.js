const API_URL = "https://api.tvmaze.com/shows";
const showGrid = document.getElementById("showGrid");
const detailsPanel = document.getElementById("detailsPanel");
const detailsContent = document.getElementById("detailsContent");
const closeDetails = document.getElementById("closeDetails");
const categoryList = document.getElementById("categoryList");

// Store fetched shows
let allShows = [];

// Fetch shows from TVmaze
async function fetchShows() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allShows = data.slice(0, 100); // Limit to 100 shows for speed
    renderShows(allShows);
  } catch (error) {
    console.error("Error fetching shows:", error);
  }
}

// Render show cards
function renderShows(shows) {
  showGrid.innerHTML = "";
  shows.forEach((show) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${show.image?.medium || 'https://via.placeholder.com/150'}" alt="${show.name}" />
      <h4>${show.name}</h4>
      <p>${show.genres.join(', ')}</p>
    `;
    card.addEventListener("click", () => showDetails(show));
    showGrid.appendChild(card);
  });
}

// Show right panel with full details
function showDetails(show) {
  detailsContent.innerHTML = `
    <h2>${show.name}</h2>
    <img src="${show.image?.original || 'https://via.placeholder.com/300'}" width="100%" />
    <p><strong>Genres:</strong> ${show.genres.join(', ')}</p>
    <p><strong>Rating:</strong> ${show.rating?.average || "N/A"}</p>
    <p>${show.summary || "No summary available."}</p>
    <a href="${show.officialSite || show.url}" target="_blank">🌐 Watch / Learn More</a>
  `;
  detailsPanel.classList.remove("hidden");
}

// Handle category filter clicks
categoryList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedGenre = e.target.innerText;
    document.querySelectorAll("#categoryList li").forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");

    if (selectedGenre === "All") {
      renderShows(allShows);
    } else {
      const filtered = allShows.filter((show) => show.genres.includes(selectedGenre));
      renderShows(filtered);
    }
  }
});

// Close detail panel
closeDetails.addEventListener("click", () => {
  detailsPanel.classList.add("hidden");
});

// Init
fetchShows();
