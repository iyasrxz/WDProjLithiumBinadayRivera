// This script checks the user's device when the page loads.
// If the user is on a mobile device (phone/tablet), it shows an alert
// and redirects them to the homepage because the page is designed for laptops/desktops.
(function() {
    function isNotLaptop(){
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    }
    if (isNotLaptop()) {
        alert("This page is best viewed on a laptop or desktop. Please switch to a compatible device for the best experience.");
        window.location.href = "../index.html";
    }

}) ();