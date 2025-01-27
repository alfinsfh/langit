const dataUrl = "data.json";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");
  const cardContainer = document.getElementById("card-container");
  const detailContainer = document.getElementById("detail-container");

  // Fetch data from JSON
  fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      const queryParams = new URLSearchParams(window.location.search);
      if (detailContainer) {
        const cardId = queryParams.get("id");
        displayDetail(data, cardId);
      } else {
        displayCards(data);
        setupFilters(data);
      }
    });

  // Display cards
  function displayCards(data) {
    const filter = filterSelect.value;
    let filteredData = [...data];

    // Apply filter
    if (filter === "newest") {
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filter === "oldest") {
      filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      filteredData.sort(() => Math.random() - 0.5); // Random
    }

    // Apply search
    const searchTerm = searchInput.value.toLowerCase();
    filteredData = filteredData.filter((card) =>
      card.title.toLowerCase().includes(searchTerm)
    );

    // Render cards
    cardContainer.innerHTML = filteredData
      .map(
        (card) => `
      <div class="card" data-id="${card.id}">
        <p>${card.date}</p>
        <h2>${card.title}</h2>
        <a>000</a>
      </div>
    `
      )
      .join("");

    // Add click event listeners to each card
    const cards = cardContainer.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const cardId = card.getAttribute("data-id");
        window.location.href = `detail.html?id=${cardId}`;
      });
    });
  }

  // Display detail page
  function displayDetail(data, id) {
    const card = data.find((item) => item.id === id);
    if (card) {
      detailContainer.innerHTML = `
      <div class="dets">
        <h2>${card.title}</h2>
        <p>@alfinsfh_ | ${card.date}</p>
        <p>${card.content}</p>
        </div>
      `;
    } else {
      detailContainer.innerHTML = `<p>Card not found.</p>`;
    }
  }

  // Set up search and filter listeners
  function setupFilters(data) {
    searchInput.addEventListener("input", () => displayCards(data));
    filterSelect.addEventListener("change", () => displayCards(data));
  }
});
