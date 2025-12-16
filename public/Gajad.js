document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter.trim();

      console.log("FILTER:", filter);

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      cards.forEach(card => {
        const category = card.dataset.category?.trim();

        console.log("CARD CATEGORY:", category);

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});