const images = document.querySelectorAll('.animate');

const obeserve = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }   
    });
});

images.forEach(image => {
    obeserve.observe(image);
}
);

