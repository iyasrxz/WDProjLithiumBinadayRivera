/* Wait for the entire HTML document to fully load before running any JavaScript.*/
document.addEventListener("DOMContentLoaded", () => {

/* Select all filter buttons used to classify characters (All Characters, Bathalas, Royalty, Side Characters)*/
  const buttons = document.querySelectorAll(".filter-btn");

/* Select all character cards that will be shown or hidden depending on the active filter*/
  const cards = document.querySelectorAll(".card");

/* Loop through each filter button and attach a click event*/
  buttons.forEach(button => {
    button.addEventListener("click", () => {

/* Get the filter value from the button's data-filter attribute (e.g., "all", "bathala", "royalty", "side") trim() is used to prevent errors caused by extra spaces*/
      const filter = button.dataset.filter.trim();

/* Remove the "active" class from all buttons to ensure only one filter appears selected at a time*/
      buttons.forEach(btn => btn.classList.remove("active"));

/* Add the "active" class to the clicked button to visually indicate the current filter*/
      button.classList.add("active");

/* Loop through all cards and determine whether they should be shown or hidden*/
      cards.forEach(card => {

/* Read the category assigned to each card using the data-category attribute*/
        const category = card.dataset.category?.trim();

/* Show the card if:
   - The selected filter is "all", OR
   - The card's category matches the selected filter
*/
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } 
        /* Otherwise, hide the card by applying the "hidden" class*/
        else {
          card.classList.add("hidden");
        }
      });
    });
  });
});

const activeTheme = localStorage.getItem("activeTheme");

if(activeTheme){
  document.body.classList.add(activeTheme);
}
