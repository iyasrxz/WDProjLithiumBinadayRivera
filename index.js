const pointsValue = document.getElementById("pointsValue");
if (pointsValue) {
    const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
    if (currentAccount) {
        pointsValue.textContent = currentAccount.points;
    }
}

function updatePoints(points) {
    const pointsValue = document.getElementById("pointsValue");
    if (pointsValue) {
        const currentPoints = parseInt(pointsValue.textContent) || 0;
        const newPoints = currentPoints + points;
        pointsValue.textContent = newPoints;
        const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
        if (currentAccount) {
            currentAccount.points = newPoints;
            localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
        }
    }
}

function showDashboard() {
    const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
    if (currentAccount) {
        document.getElementById("welcome").textContent = `Welcome, ${currentAccount.username}!`;
        document.getElementById("points").textContent = `Points: ${currentAccount.points}`;
        document.getElementById("color").textContent = `Color: ${currentAccount.color}`;
    }
}
