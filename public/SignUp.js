// sign up
function signUp() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("pass").value;
    const choice = document.getElementById("choice").value;

    if (username === "" || password === "" || choice === "") {
        alert("Please fill in all fields.");
        return;
    }

    // check if username already exists
    if (localStorage.getItem("account_" + username)) {
        alert("Username already exists.");
        return;
    }

    const account = {
        username,
        password,
        choice,
        points: 0, 
        color: choice === "Hathoria" ? "red"
             : choice === "Lireo" ? "blue"
             : choice === "Sapiro" ? "brown"
             : "green",
        popUp: false,
        ownedThemes: [],
        activeTheme: "",
        completedLevels: {}
    };

    // save per account
    localStorage.setItem("account_" + username, JSON.stringify(account));
    localStorage.setItem("currentAccount", JSON.stringify(account));

    alert("Account created successfully!");

    showPopUp();

    account.popUp = true;
    localStorage.setItem("currentAccount", JSON.stringify(account));
    localStorage.setItem("account_" + username, JSON.stringify(account));
}


// log in
function logIn() {
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passLogin").value;

    // ✅ load correct account
    const saved = localStorage.getItem("account_" + username);

    if (!saved) {
        alert("No account found. Please sign up first.");
        return;
    }

    const account = JSON.parse(saved);

    if (account.password === password) {
        alert("Login successful!");

        localStorage.setItem("currentAccount", JSON.stringify(account));
        window.location.href = "../index.html";
    } else {
        alert("Invalid username or password.");
    }
}


// dashboard
function showDashboard() {
    const saved = localStorage.getItem("currentAccount");
    if (!saved) return;

    const account = JSON.parse(saved);

    dashboard.style.display = "block";
    document.getElementById("welcome").textContent = `Welcome, ${account.username}!`;
    document.getElementById("points").textContent = `Points: ${account.points}`;
    document.getElementById("color").textContent = `Color: ${account.color}`;

    if (!account.popUp) {
        showPopUp();
        account.popUp = true;

        localStorage.setItem("currentAccount", JSON.stringify(account));
        localStorage.setItem("account_" + account.username, JSON.stringify(account));
    }
}

// popup
function showPopUp() {
    const modal = document.getElementById("popup");
    const img = document.getElementById("popupImage");
    const text = document.getElementById("popupText");

    const saved = localStorage.getItem("currentAccount");
    const account = JSON.parse(saved);

    const popUp = {
        "Hathoria": {
            img: "../assets/ThePirena.png",
            text: "Hathoria is the kingdom of fire, known for its determined warriors and passionate people."
        },
        "Lireo": {
            img: "../assets/TheAmihan.png",
            text: "Lireo is the kingdom of air where royalties reside."
        },
        "Sapiro": {
            img: "../assets/TheDanaya.png",
            text: "Sapiro is the kingdom of earth, renowned for its strong and resilient inhabitants."
        },
        "Adamya": {
            img: "../assets/TheAlena.png",
            text: "Adamya is the kingdom of water, home to unique inhabitants fitting for the environment."
        }
    };

    const selected = popUp[account.choice];
    img.src = selected.img;
    text.textContent = selected.text;
    modal.style.display = "flex";
}

// close popup
function closePopUp() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "../index.html";
}

// add points
function addPoints(amount = 10) {
    const saved = localStorage.getItem("currentAccount");
    if (!saved) return;

    const account = JSON.parse(saved);

    account.points += amount;

    // save both places
    localStorage.setItem("currentAccount", JSON.stringify(account));
    localStorage.setItem("account_" + account.username, JSON.stringify(account));

    document.getElementById("points").textContent = `Points: ${account.points}`;
}

// customize
function customize() {
    const saved = localStorage.getItem("currentAccount");
    if (!saved) return;

    const account = JSON.parse(saved);
    const colorInput = document.getElementById("colorInput").value;

    if (account.points < 20) {
        alert("You don't have enough points to customize your website.");
        return;
    }

    account.points -= 20;
    account.color = colorInput;

    // save both places
    localStorage.setItem("currentAccount", JSON.stringify(account));
    localStorage.setItem("account_" + account.username, JSON.stringify(account));

    document.getElementById("points").textContent = `Points: ${account.points}`;
    document.getElementById("color").textContent = `Color: ${account.color}`;
}