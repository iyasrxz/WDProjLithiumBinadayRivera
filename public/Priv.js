// This file checks if the user is signed up or logged in by looking for a "currentAccount" in localStorage. If it doesn't find one, it alerts the user and redirects them to the main page (index.html).
function privatePage() {
    const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
    if (!currentAccount) {
        alert("You must be logged in to access this page.");
        window.location.href = "../index.html";
        return;
    }
}
// Calls the function
privatePage();