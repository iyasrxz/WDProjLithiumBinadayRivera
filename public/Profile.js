// This function is the CREATE part of the code
function signUp() {
    // Get the values, and removes unnecessary spaces (Using trim)
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('pass').value;
    const choice = document.getElementById('choice').value;

    // Checks whether any of the necessary fields are empty
    if (!username || !password || !choice) {
        alert('Please fill in all fields.');
        return;
    }

    // An object that is based on the user input
    const account = {
        username,
        password,
        kingdom: choice,
        choice
    };
    
    // Converts the object to a string -> stores to the localStorage
    localStorage.setItem('currentAccount', JSON.stringify(account));
    // Updates UI
    markLoggedIn(true);
    alert('Account created successfully! You are now logged in.');
    renderAuthenticatedView(account);
    showPopUp(); // Allows the pop up to be visible after clicking the create account button
}

// This function is a READ function
function logIn() {
    const usernameLogin = document.getElementById('usernameLogin').value.trim();
    const passwordLogin = document.getElementById('passLogin').value;
    // Gets the existing data in the localStorage
    const saved = localStorage.getItem('currentAccount');

    if (!saved) {
        // Alerts the user that there is no account in the storage; directs them to sign up 
        alert('No account found. Please sign up first.');
        switchTab('signup');
        return;
    }
    // Saved string -> Object (For comparison)
    const account = JSON.parse(saved);
    // The comparison which makes sure that the details are matched, else the user is asked to retry
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
    // References UI elements, and gathers stored data
    const modal = document.getElementById("popup");
    const img = document.getElementById("popupImage");
    const text = document.getElementById("popupText");
    const saved = localStorage.getItem("currentAccount");

    // Ensures that it exists before proceeding
    if (!modal || !img || !text) {
        console.error('Profile popup element missing', { modal, img, text });
        alert('Popup markup is missing or has wrong IDs. Check Profile.html.');
        return;
    }

    // Reads to see if there is a stored account, else it will alert the user to sign up first
    if (!saved) {
        alert("No account found. Please sign up first.");
        return;
    }
    const account = JSON.parse(saved);

    // Maps the data based on the kingdom choice, and fills the pop up with the corresponding image and text. If there is no kingdom, it will alert the user to sign up again with a kingdom
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

    // Choosing which pop up will be shown based on the kingdom choice, and if there is no kingdom, it will alert the user to sign up again with a kingdom
    const kingdom = account.kingdom || account.choice;
    console.log('Profile showPopUp', { account, kingdom, modal, img, text });
    const selected = popUp[kingdom];
    if (!selected) {
        alert("No kingdom selected. Please sign up again with a kingdom.");
        return;
    }

    // Fills/forces the pop up to show the corresponding image and texts
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
window.addEventListener("DOMContentLoaded", () => { 
    // checks storage to see if there is saved account/session
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const account = getSavedAccount(); 

    if (isLoggedIn && account) {
        // recognizes the user, allowing them to access the profile
        renderAuthenticatedView(account);
    } else {
        // no recognized user, redirecting them to sign up first before accessing the profile
        switchTab('signup');
        const settings = document.querySelector('.settings');
        if (settings) settings.classList.add('hidden');
    }
}); 
// this function represents READ in CRUD
function getSavedAccount() {
    // Retrieves the data using 'currentAccount'
    const saved = localStorage.getItem('currentAccount');
    // Checks if there is an account, else it will return null
    if (!saved) return null;

    try {
        // Converts the string -> object so that account is accessible
        return JSON.parse(saved);
    } catch (error) {
        // Tells the user if the process was invalid then it will return null
        console.error('Failed to parse saved account from localStorage', error);
        return null;
    }
}

// This function is an UPDATE function
function markLoggedIn(value) {
    // Ternary operator
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
}

// This function can be both READ and UPDATE
function renderAuthenticatedView(account) {
    // Determines the main layout
    const auth = document.querySelector('.auth'); // Login/Signup
    const settings = document.querySelector('.settings'); // Profile

    // This if statement hides the AUTHenticayion form
    if (auth) auth.classList.add('hidden');

    // Makes the profile area visible
    if (settings) {
        settings.classList.remove('hidden');
        settings.classList.add('visible');
    }

    // Maps the objects into HTML elements; They basically update or fill the displays, labels, and inputs.
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
}

// Navigates whether sign-up or log-in
function switchTab(type) {
    // References the containers and buttons
    const signForm = document.getElementById('signForm'); // Sign In
    const logForm = document.getElementById('logForm'); // Log In
    const hCreate = document.getElementById('hCreate'); // Create Account; Button
    const hLogin = document.getElementById('hLogin');   // Log In; Button

    if (type === 'signup') {
        // Visibility of the Sign Up form
        signForm.classList.remove('hidden');
        logForm.classList.add('hidden');
        hCreate.classList.add('active');
        hLogin.classList.remove('active');
    } else {
        // Visibility of the Log In Form
        signForm.classList.add('hidden');
        logForm.classList.remove('hidden');
        hCreate.classList.remove('active');
        hLogin.classList.add('active');
    }
}

// Hides the profile/settings area
function hideSettings() {
    const settings = document.querySelector('.settings');
    if (settings) {
        settings.classList.remove('visible');
        settings.classList.add('hidden');
    }
}
// Removes or signs out from the current user session 
function signOut() {
    markLoggedIn(false);
    closePopUp();
    hideSettings();
    const auth = document.querySelector('.auth');
    if (auth) auth.classList.remove('hidden');
    alert('You have signed out.');
    switchTab('login');
}

// Fully deletes the user account 
function deleteAccount() {
    markLoggedIn(false);
    localStorage.removeItem('currentAccount');
    closePopUp();
    hideSettings();
    const auth = document.querySelector('.auth');
    if (auth) auth.classList.remove('hidden');
    alert('Account deleted. Please sign up again.');
    switchTab('signup');
}

// Standard function for changes and modifications 
function saveAccountChanges(account) {
    // Saves the updated account object back to localStorage
    localStorage.setItem('currentAccount', JSON.stringify(account));
}

// This function consists of Reading, Modifying, Rewriting, and UPDATING the data in the localStorage
function updateAccountField(field, value) {
    const account = getSavedAccount();
    if (!account) return;
    account[field] = value;
    saveAccountChanges(account);
    renderAuthenticatedView(account);
}

// Allows the user to change their username
function changeUsername() {
    const newUsername = prompt('Enter your new username:');
    if (!newUsername) return;
    updateAccountField('username', newUsername.trim());
    alert('Username updated.');
}

// Allows the user to change their password
function changePassword() {
    const newPassword = prompt('Enter your new password:');
    if (!newPassword) return;
    updateAccountField('password', newPassword);
    alert('Password updated.');
}

// Clears the bio or about me section
function clearAbout() {
    const aboutInput = document.getElementById('aboutInput');
    if (aboutInput) aboutInput.value = '';
    updateAccountField('bio', '');
    alert('Bio cleared.');
}

// Saves the email
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

// Clears the email
function clearEmail() {
    const emailInput = document.getElementById('emailInput');
    if (emailInput) emailInput.value = '';
    updateAccountField('email', '');
    alert('Email deleted.');
}

// Saves the bio or about me section
function saveAbout() {
    const aboutInput = document.getElementById('aboutInput');
    if (!aboutInput) return;
    updateAccountField('bio', aboutInput.value.trim());
    alert('Bio saved.');
}

// Allows the user to change their chosen kingdom
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

// Handles the avatar upload and preview
const fileInput = document.getElementById('fileInput');
const avatar = document.getElementById('avatar');

fileInput.addEventListener('change', function() {
     const file = this.files ? this.files[0] : null;
     if (file && avatar) {
         const reader = new FileReader();
         reader.onload = function(e) {
             avatar.src = e.target.result; // Sets the avatar image source to the uploaded file's data URL for preview
         };
         reader.readAsDataURL(file); // Converts the file to a data URL for preview
     }
});

// Clears the avatar preview and resets the file input
document.getElementById('clearAvatar').addEventListener('click', function() {
    avatar.src = "";
    fileInput.value = "";
});