const showGrid = document.getElementById("showGrid");
const detailsPanel = document.getElementById("detailsPanel");
const detailsContent = document.getElementById("detailsContent");
const closeDetails = document.getElementById("closeDetails");

// Sample show card generator
const shows = [
  { title: "Stranger Things", genre: "Sci-Fi", description: "Mysterious events in Hawkins...", image: "https://via.placeholder.com/150" },
  { title: "Brooklyn 99", genre: "Comedy", description: "Detectives and laughs.", image: "https://via.placeholder.com/150" },
  { title: "Breaking Bad", genre: "Drama", description: "A chemistry teacher goes rogue.", image: "https://via.placeholder.com/150" },
];

function renderShows(shows) {
  showGrid.innerHTML = "";
  shows.forEach((show) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${show.image}" alt="${show.title}" width="100%" />
      <h4>${show.title}</h4>
      <p>${show.genre}</p>
    `;
    card.addEventListener("click", () => {
      detailsContent.innerHTML = `
        <h2>${show.title}</h2>
        <img src="${show.image}" alt="${show.title}" width="100%" />
        <p><strong>Genre:</strong> ${show.genre}</p>
        <p>${show.description}</p>
      `;
      detailsPanel.classList.remove("hidden");
    });
    showGrid.appendChild(card);
  });
}

closeDetails.addEventListener("click", () => {
  detailsPanel.classList.add("hidden");
});

renderShows(shows);
