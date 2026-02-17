function signUp() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("pass").value;
    const choice = document.getElementById("choice").value;

    if (username === "" || password === "" || choice === "") {
        alert("Please fill in all fields.");
        return;
    }

    const account = {
        username,
        password,
        choice,
        points:0,
        color: choice === "Hathoria" ? "red" : choice === "Lireo" ? "blue" : choice === "Sapiro" ? "brown" : "green",
        popUp: false
    };

    localStorage.setItem("account", JSON.stringify(account));
    localStorage.setItem("currentAccount", JSON.stringify(account));
    alert("Account created successfully!");
    showPopUp();
    account.popUp = true;
    localStorage.setItem("currentAccount", JSON.stringify(account));
}

function logIn() {
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passLogin").value;

    const saved = localStorage.getItem("account");
    if (!saved) {
        alert("No account found. Please sign up first.");
        return;
    }

    const account = JSON.parse(saved);

    if (account.username === username && account.password === password) {
        alert("Login successful!");
        localStorage.setItem("currentAccount", JSON.stringify(account));
        window.location.href = "../index.html";
    } else {
        alert("Invalid username or password.");
    }
}   

function showDashboard(account) {
    dashboard.style.display = "block";
    document.getElementById("welcome").textContent = `Welcome, ${account.username}!`;
    document.getElementById("points").textContent = `Points: ${account.points}`;
    document.getElementById("color").textContent = `Color: ${account.color}`;

    if (!account.popUp) {
        showPopUp();
        account.popUp = true;
        localStorage.setItem("currentAccount", JSON.stringify(account));
    }   
}
function showPopUp() {
    const modal = document.getElementById("popup");
    const img = document.getElementById("popupImage");
    const text = document.getElementById("popupText");
    const saved = localStorage.getItem("currentAccount");
    const account = JSON.parse(saved);

    const popUp = {
        "Hathoria": {
            img: "../assets/ThePirena.png",
            text: "Hathoria is the kingdom of fire, known for its fierce warriors and passionate people."
        },
        "Lireo": {
            img: "assets/lireo.png",
            text: "Lireo is the kingdom of water, famous for its serene landscapes and skilled sailors."
        },
        "Sapiro": {
            img: "assets/sapiro.png",
            text: "Sapiro is the kingdom of earth, renowned for its strong and resilient inhabitants."
        },
        "Adamya": {
            img: "assets/adamya.png",
            text: "Adamya is the kingdom of air, celebrated for its free-spirited and innovative citizens."
        }
    };

    const selected = popUp[account.choice];
    img.src = selected.img;
    text.textContent = selected.text;
    modal.style.display = "flex";
};

function closePopUp() {
    const modal = document.getElementById("popup");
    modal.style.display = "none";
    window.location.href = "../index.html";
}

function addPoints() {
    const username = document.getElementById("currentId").value;
    const saved = localStorage.getItem("username");

    account.points += 10;
    localStorage.setItem("currentAccount", JSON.stringify(account));
    document.getElementById("points").textContent = `Points: ${account.points}`;
}

function customize(color) {
    const colorInput = document.getElementById("colorInput").value;
    account.color = colorInput;
    localStorage.setItem("currentAccount", JSON.stringify(account));
    document.getElementById("color").textContent = `Color: ${account.color}`;

    if (account.points < 20) {
        alert("You don't have enough points to customize your website.");
        return;
    }
    
    account.points -= 20;
    account.color = colorInput;
}
