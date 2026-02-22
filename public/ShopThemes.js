// load current account
let currentAccount = JSON.parse(localStorage.getItem("currentAccount"));


// get data from account
let points = currentAccount.points || 0;
let ownedThemes = currentAccount.ownedThemes || [];
let activeTheme = currentAccount.activeTheme || "";

// show points
document.getElementById("pointsDisplay").textContent =
  "Your Points: " + points;

document.getElementById("pointsDisplay").textContent =
  "Your Points: " + points;

function buyTheme(themeName, cost){

  if(ownedThemes.includes(themeName)){
    alert("You already own this theme.");
    return;
  }

  if(points < cost){
    alert("Not enough points!");
    return;
  }

  // deduct
  points -= cost;
  ownedThemes.push(themeName);

  // save into account
  currentAccount.points = points;
  currentAccount.ownedThemes = ownedThemes;

  // save both storages
  localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
  localStorage.setItem("account_" + currentAccount.username, JSON.stringify(currentAccount));

  alert("Theme unlocked!");
  location.reload();
}

function equipTheme(themeName) {

  if (themeName !== "" && !ownedThemes.includes(themeName)) {
    alert("Buy this theme first!");
    return;
  }

  // save to account
  currentAccount.activeTheme = themeName;

  localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
  localStorage.setItem("account_" + currentAccount.username, JSON.stringify(currentAccount));

  // apply immediately
  document.body.className = themeName || "default";

  updateButtons();
  alert("Theme applied!");
}

function updateButtons(){
  const activeTheme = currentAccount.activeTheme || "";

  document.querySelectorAll(".shop-item button, .theme-item button").forEach(btn => {
    if(btn.textContent === "Equip" || btn.textContent === "Equipped"){
      const match = btn.getAttribute("onclick").match(/equipTheme\('([^']*)'\)/);
      if(match){
        const btnTheme = match[1];
        if(btnTheme === activeTheme){
          btn.textContent = "Equipped";
          btn.disabled = true;
          btn.style.backgroundColor = "#555";
        } else {
          btn.textContent = "Equip";
          btn.disabled = false;
        }
      }
    }
  });
}
// When the page finishes loading, get the saved theme from localStorage.
// If no theme is saved, use "default", then apply the theme to the page.
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("currentAccount");
  if (!saved) return;

  const account = JSON.parse(saved);

  // apply saved theme on page load
  document.body.className = account.activeTheme || "default";
});