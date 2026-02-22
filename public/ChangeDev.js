(function() {
    function isNotLaptop(){
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    }
    if (isNotLaptop()) {
        alert("This page is best viewed on a laptop or desktop. Please switch to a compatible device for the best experience.");
        window.location.href = "../index.html";
    }

}) ();