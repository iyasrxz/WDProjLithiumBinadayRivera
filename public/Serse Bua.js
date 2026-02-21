/* Wait for the entire HTML document to fully load before running any JavaScript.*/
document.addEventListener('DOMContentLoaded', () => {

/* Select all elements with the class "section". These sections will be animated or styled when they enter the viewport.*/
    const sections = document.querySelectorAll('.section');

/*
    Configuration options for the IntersectionObserver:
      - root: null means the viewport is used as the reference
      - rootMargin: no additional margin around the viewport
      - threshold: 0.5 means 50% of the section must be visible
        before it is considered "in view"
*/
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

/* Create an IntersectionObserver to monitor when sections enter or leave the viewport */
    const sectionObserver = new IntersectionObserver((entries, observer) => {

/* Loop through each observed entry to check its visibility state */
        entries.forEach(entry => {

/* If the section is currently visible within the viewport, add the class "is-in-view" to trigger animations or styles */
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in-view');
            } 

/* If the section is not visible, no action is taken (class is not removed) */
            else {
            }

        });
    }, observerOptions);

    /* Attach the observer to each section so visibility changes can be detected */
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("currentAccount");
  if (!saved) return;

  const account = JSON.parse(saved);

  // apply saved theme on page load
  document.body.className = account.activeTheme || "default";
});