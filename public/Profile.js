function resetUI() {
    const avatar = document.getElementById('avatar');

    if (avatar) {
        avatar.src = "../assets/placeholder.jpg";
    }

    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = "";

    document.body.className = "";
    document.body.classList.add("default");

}

function getSavedAccount() {
    const saved = localStorage.getItem('currentAccount');
    if (!saved) return null;

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error('Failed to parse saved account from localStorage', error);
        return null;
    }
}

function markLoggedIn(value) {
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
}

function renderAuthenticatedView(account) {
    const auth = document.querySelector('.auth');
    const settings = document.querySelector('.settings');
    if (auth) auth.classList.add('hidden');
    if (settings) {
        settings.classList.remove('hidden');
        settings.classList.add('visible');
    }

    const displayUsername = document.getElementById('displayUsername');
    if (displayUsername) displayUsername.innerText = account.username || '';

    const dispUser = document.getElementById('dispUser');
    if (dispUser) dispUser.innerText = account.username || 'Username';

    const kingdomLabel = document.getElementById('kingdomLabel');
    if (kingdomLabel) kingdomLabel.innerText = account.kingdom || account.choice || '';

    const emailInput = document.getElementById('emailInput');
    if (emailInput) emailInput.value = account.email || '';

    const aboutInput = document.getElementById('aboutInput');
    if (aboutInput) aboutInput.value = account.bio || '';

    const avatar = document.getElementById('avatar');
    if (avatar && account.username) {
    const key = `avatar_${account.username}`;
    const savedAvatar = localStorage.getItem(key);

    avatar.src = savedAvatar
        ? savedAvatar
        : "../assets/placeholder.jpg";
    }
}

function switchTab(type) {
    const signForm = document.getElementById('signForm');
    const logForm = document.getElementById('logForm');
    const hCreate = document.getElementById('hCreate');
    const hLogin = document.getElementById('hLogin');

    if (type === 'signup') {
        signForm.classList.remove('hidden');
        logForm.classList.add('hidden');
        hCreate.classList.add('active');
        hLogin.classList.remove('active');
    } else {
        signForm.classList.add('hidden');
        logForm.classList.remove('hidden');
        hCreate.classList.remove('active');
        hLogin.classList.add('active');
    }
}
function signUp() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('pass').value;
    const choice = document.getElementById('choice').value;

    if (!username || !password || !choice) {
        alert('Please fill in all fields.');
        return;
    }

    const account = {
        username,
        password,
        kingdom: choice,
        choice
    };

    localStorage.setItem('currentAccount', JSON.stringify(account));
    markLoggedIn(true);
    alert('Account created successfully! You are now logged in.');
    renderAuthenticatedView(account);
    showPopUp();
}

function logIn() {
    const usernameLogin = document.getElementById('usernameLogin').value.trim();
    const passwordLogin = document.getElementById('passLogin').value;
    const saved = localStorage.getItem('currentAccount');

    if (!saved) {
        alert('No account found. Please sign up first.');
        switchTab('signup');
        return;
    }

    const account = JSON.parse(saved);
    console.log('Profile logIn', { usernameLogin, passwordLogin, savedAccount: account });
    if (account.username === usernameLogin && account.password === passwordLogin) {
        markLoggedIn(true);
        alert('Login successful!');
        renderAuthenticatedView(account);
    } else {
        alert('Incorrect username or password. Please try again.');
    }
}
function showPopUp() {

    const modal = document.getElementById("popup");
    const img = document.getElementById("popupImage");
    const text = document.getElementById("popupText");
    const saved = localStorage.getItem("currentAccount");
    if (!modal || !img || !text) {
        console.error('Profile popup element missing', { modal, img, text });
        alert('Popup markup is missing or has wrong IDs. Check Profile.html.');
        return;
    }
    if (!saved) {
        alert("No account found. Please sign up first.");
        return;
    }
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
    const kingdom = account.kingdom || account.choice;
    console.log('Profile showPopUp', { account, kingdom, modal, img, text });
    const selected = popUp[kingdom];
    if (!selected) {
        alert("No kingdom selected. Please sign up again with a kingdom.");
        return;
    }
    img.src = selected.img;
    text.textContent = selected.text;
    modal.classList.remove('hidden');
    modal.hidden = false;
    modal.style.display = "flex";
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.zIndex = "9999";

    const settings = document.querySelector('.settings');
    if (settings) {
        settings.classList.remove('hidden');
        settings.classList.add('visible');
    }
    const auth = document.querySelector('.auth');
    if (auth) auth.classList.add('hidden');
}
function hideSettings() {
    const settings = document.querySelector('.settings');
    if (settings) {
        settings.classList.remove('visible');
        settings.classList.add('hidden');
    }
}

function signOut() {
    const account = getSavedAccount();
    if (account) {
        delete account.activeTheme;
        saveAccountChanges(account);
    }
    markLoggedIn(false);
    resetUI();
    closePopUp();
    hideSettings();
    const auth = document.querySelector('.auth');
    if (auth) auth.classList.remove('hidden');
    switchTab('login');
    alert('You have signed out.');
}

function deleteAccount() {
    markLoggedIn(false);
    const account = getSavedAccount();
    if (account) {
        localStorage.removeItem(`avatar_${account.username}`);
    }
    localStorage.removeItem('currentAccount');
    localStorage.removeItem('activeTheme');
    localStorage.removeItem('currentAccount');
    resetUI();
    closePopUp();
    hideSettings();
    const auth = document.querySelector('.auth');
    if (auth) auth.classList.remove('hidden');
    switchTab('signup');
    alert('Account deleted. Please sign up again.');
}

function saveAccountChanges(account) {
    localStorage.setItem('currentAccount', JSON.stringify(account));
}

function updateAccountField(field, value) {
    const account = getSavedAccount();
    if (!account) return;
    account[field] = value;
    saveAccountChanges(account);
    renderAuthenticatedView(account);
}

function changeUsername() {
    const newUsername = prompt('Enter your new username:');
    if (!newUsername) return;
    updateAccountField('username', newUsername.trim());
    alert('Username updated.');
}

function changePassword() {
    const newPassword = prompt('Enter your new password:');
    if (!newPassword) return;
    updateAccountField('password', newPassword);
    alert('Password updated.');
}

function clearAbout() {
    const aboutInput = document.getElementById('aboutInput');
    if (aboutInput) aboutInput.value = '';
    updateAccountField('bio', '');
    alert('Bio cleared.');
}

function saveEmail() {
    const emailInput = document.getElementById('emailInput');
    if (!emailInput) return;
    const account = getSavedAccount();
    if (!account) {
        alert('No account found. Please sign up or log in.');
        return;
    }
    account.email = emailInput.value.trim();
    saveAccountChanges(account);
    renderAuthenticatedView(account);
    alert('Email saved.');
}

function clearEmail() {
    const emailInput = document.getElementById('emailInput');
    if (emailInput) emailInput.value = '';
    updateAccountField('email', '');
    alert('Email deleted.');
}

function saveAbout() {
    const aboutInput = document.getElementById('aboutInput');
    if (!aboutInput) return;
    updateAccountField('bio', aboutInput.value.trim());
    alert('Bio saved.');
}

function changeKingdom() {
    const kingdomSelect = document.getElementById('kingdomSelect');
    if (!kingdomSelect) return;
    const kingdom = kingdomSelect.value;
    if (!kingdom) return;
    const account = getSavedAccount();
    if (!account) {
        alert('No account found. Please sign up or log in.');
        return;
    }
    account.kingdom = kingdom;
    account.choice = kingdom;
    saveAccountChanges(account);
    renderAuthenticatedView(account);
    alert('Kingdom updated.');
}
// close popup
function closePopUp() {
    const modal = document.getElementById("popup");
    modal.classList.add('hidden');
    modal.style.display = "none";
}

const fileInput = document.getElementById('fileInput');
const avatar = document.getElementById('avatar');
const clearAvatarBtn = document.getElementById('clearAvatar');
function getAvatarKey() {
    const account = getSavedAccount();
    return account ? `avatar_${account.username}` : "avatar_guest";
}

//upload or replace avatar
fileInput.addEventListener('change', function () {
    const file = this.files ? this.files[0] : null;
    const avatar = document.getElementById('avatar');

    if (!file || !avatar) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageData = e.target.result;
        avatar.src = imageData;
        const key = getAvatarKey();
        localStorage.setItem(key, imageData);
    };
    reader.readAsDataURL(file);
});

//delete avatar
clearAvatarBtn.addEventListener('click', function () {
    const avatar = document.getElementById('avatar');
    const key = getAvatarKey();

    if (avatar) {
        avatar.src = "../assets/placeholder.jpg";
    }
    fileInput.value = "";
    localStorage.removeItem(key);
});

window.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const account = getSavedAccount();

    // apply theme
    if (account && account.activeTheme) {
        document.body.className = account.activeTheme;
    } else {
        document.body.className = "default";
    }

    // load avatar
    const avatar = document.getElementById('avatar');
    if (account && avatar) {
        const key = `avatar_${account.username}`;
        const savedAvatar = localStorage.getItem(key);
        avatar.src = savedAvatar ? savedAvatar : "../assets/placeholder.jpg";
    }

    // login state
    if (isLoggedIn && account) {
        renderAuthenticatedView(account);
    } else {
        switchTab('signup');
        const settings = document.querySelector('.settings');
        if (settings) settings.classList.add('hidden');
    }
});