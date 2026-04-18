// This file checks whether the user is signed in and has a saved account in localStorage. If not, it alerts the user and redirects them to the Profile page.
function privatePage() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentAccount = null;

    try {
        currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
    } catch (error) {
        console.error('Failed to parse currentAccount from localStorage', error);
    }

    if (!isLoggedIn || !currentAccount) {
        alert('You must be logged in to access this page.');
        window.location.href = 'Profile.html';
        return;
    }
}

// Calls the function
privatePage();