document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in-view');
            }
            else {
            }

        });
    }, observerOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});