const API_URL = "https://api.tvmaze.com/shows"; // TVmaze API endpoint for all shows

// DOM element references
const showGrid = document.getElementById("showGrid"); // Container for show cards
const categoryList = document.getElementById("categoryList"); // Genre filter list
const detailView = document.getElementById("show-detail-view"); // Show detail overlay
const appContainer = document.querySelector(".app-container"); // Main app container

// Detail view element references
const titleEl = document.getElementById("detailTitle"); // Show title in detail view
const genresEl = document.getElementById("detailGenres"); // Genres in detail view
const summaryEl = document.getElementById("detailSummary"); // Summary in detail view
const ratingEl = document.getElementById("ratingBadge"); // Rating badge in detail view
const trailerBtn = document.getElementById("trailerBtn"); // YouTube trailer button
const officialBtn = document.getElementById("officialBtn"); // Official site button
const castListEl = document.getElementById("castList"); // Cast list in detail view

const searchInput = document.getElementById("searchInput"); // Search input field

let allShows = []; // Will hold the fetched shows

// Fetch the top 100 shows from the API and render them
async function fetchShows() {
  try {
    const res = await fetch(API_URL); // Fetch all shows
    const data = await res.json(); // Parse JSON response
    allShows = data.slice(0, 100); // Limit to top 100 shows
    renderShows(allShows); // Render the shows on the grid
  } catch (err) {
    console.error("Failed to fetch shows:", err); // Log errors if fetch fails
  }
}

// Render an array of shows as cards in the grid
function renderShows(shows) {
  showGrid.innerHTML = ""; // Clear previous cards
  shows.forEach(show => {
    const card = createShowCard(show); // Create a card for each show
    showGrid.appendChild(card); // Add card to the grid
  });
}

// Create a card element for a single show
function createShowCard(show) {
  const card = document.createElement("div");
  card.className = "card";

  // Use show image or fallback placeholder
  const imgSrc = show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image";
  // Join genres or show fallback text
  const genres = show.genres?.length ? show.genres.join(', ') : "No genres";

  // Card HTML structure
  card.innerHTML = `
    <img src="${imgSrc}" alt="${show.name || 'TV Show Poster'}" />
    <h4>${show.name}</h4>
    <p>${genres}</p>
  `;

  // Show details on card click
  card.addEventListener("click", () => showDetails(show));
  return card;
}

// Display the detail overlay for a selected show
async function showDetails(show) {
  // Set background image for detail view
  detailView.style.backgroundImage = `url(${show.image?.original || ""})`;
  detailView.classList.remove("hidden");
  detailView.classList.add("show");
  appContainer.style.display = "none"; // Hide main grid

  // Populate detail fields
  titleEl.textContent = show.name;
  genresEl.textContent = show.genres?.length ? show.genres.join(', ') : "No genres";
  summaryEl.innerHTML = show.summary || "No summary available.";
  ratingEl.textContent = show.rating?.average || "N/A";

  // Set trailer and official site links
  const trailerSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(show.name + ' trailer')}`;
  trailerBtn.href = trailerSearch;
  officialBtn.href = show.officialSite || show.url;

  // Fetch and display main cast (first 5 actors)
  try {
    const castRes = await fetch(`https://api.tvmaze.com/shows/${show.id}/cast`);
    const castData = await castRes.json();
    const castNames = castData
      .map(member => member?.person?.name || member?.actor?.name) // Get actor name
      .filter(Boolean)
      .slice(0, 5) // Limit to 5
      .join(', ');
    castListEl.innerHTML = `<strong>Main Cast:</strong> ${castNames || "N/A"}`;
  } catch (err) {
    castListEl.textContent = "Main Cast: N/A"; // Fallback if fetch fails
  }
}

// Handle back button: hide detail view and show main grid
document.getElementById("backButton").addEventListener("click", () => {
  detailView.classList.add("hidden");
  detailView.classList.remove("show");
  appContainer.style.display = "flex";
});

// Handle genre filter clicks
categoryList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const genre = e.target.innerText;
    // Highlight selected genre
    document.querySelectorAll("#categoryList li").forEach(li => li.classList.remove("active"));
    e.target.classList.add("active");

    // Filter shows by genre or show all
    const filtered = genre === "All" ? allShows : allShows.filter(show => show.genres.includes(genre));
    renderShows(filtered);
  }
});

// Handle live search input
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase(); // Get search term
  // Filter shows by name (case-insensitive)
  const filtered = allShows.filter(show => show.name.toLowerCase().includes(searchTerm));
  renderShows(filtered);
});

// Initialize app
fetchShows();
