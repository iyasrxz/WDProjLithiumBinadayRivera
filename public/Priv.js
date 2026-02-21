function privatePage() {
    const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
    if (!currentAccount) {
        alert("You must be logged in to access this page.");
        window.location.href = "../public/SignUp.html";
        return;
    }
}
privatePage();