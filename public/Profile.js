window.addEventListener("DOMContentLoaded", () => {
     const saved = localStorage.getItem("currentAccount");
     if (!saved) return;

     const account = JSON.parse(saved);

     // apply saved theme on page load
     document.body.className = account.activeTheme || "default";
    });