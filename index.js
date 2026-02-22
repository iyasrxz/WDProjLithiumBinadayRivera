//selects the elements with the class "animate" and stores them in a variable called "images"
const images = document.querySelectorAll('.animate');

//IntersectionObserve to follow/detect when an element enters the viewport
const obeserve = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){ //if its visible, add the class "show" which would trigger the animation
            entry.target.classList.add('show');
        }   
    });
});
//Observe and watch the image
images.forEach(image => {
    obeserve.observe(image);
}
);

//Gets the canvas element; In 2D context for drawing
const canvas = document.getElementById('boogsh');
const ctx = canvas.getContext('2d');

//Makes it so that it will fit or resize the canvas to the screen size of the user
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
//Calls the function
resizeCanvas();

//Resize whenever the canvas/screen is resized by the user
window.addEventListener('resize', resizeCanvas);

//Arrays used to store the fireworks and particles for the animation
let fireworks = [];
let particles = [];

class Firework {
    constructor(x, y) {
        //Random horizontal position
        this.x = Math.random() * canvas.width;
        //This makes the firework start from the bottom of the screen
        this.y = canvas.height;
        //Random vertical position for the explosion (but always at the upper half)
        this.targetY = Math.random() * canvas.height / 2;
        //Random up speed
        this.speed = 5 + Math.random() * 3;
        //Flag to check if the firework has exploded
        this.exploded = false;
    }

    //update the position of the firework; If it reaches the targetY, it will explode and create particles
    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
                this.exploded = true;
            }
        }
    }

    //Creates the explosion particles with random colors and adds them to the particles array
    explode(){
        const colors = ['#ca6666', '#457445', '#4d4dc5', '#5c4f33', '#ffffff', '#3e6565'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        //Creates 150 particles for the explosion
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle(this.x, this.y, color));
        }
    }

    //Draws the initial firework as a small white circle
    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            //Adds a glow effect to the firework
            ctx.shadowColor = 'white';
            ctx.shadowBlur = 10;
            ctx.fill();
            //Resets the shadow
            ctx.shadowBlur = 0;
        }
    }
}
//Particle class for the explosion particles
class Particle{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        //Random speed and direction for the particles
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        //Transparency of the particle; It will fade out over time
        this.alpha = 1;
        //The size of the particle
        this.radius = 4;
    }
    //updates particle movement
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        //slowly fade out the particle
        this.alpha -= 0.02;
    }

    draw(){
        //Applies transparency
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        //Applies a glow effect to the particles
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        //Resets the shadow and transparency
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

//Main function to animate
function animate(){
    //Clears the canvas for every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Updates and draws each firework
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        //If it has exploded, it is removed from the array
        if (firework.exploded) fireworks.splice(index, 1);
    });
    //Updates and draws each particle
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        //Removes the particle if it has fully faded out
        if (particle.alpha <= 0) particles.splice(index, 1);
    });
    //Calls the animate function again; For the loop
    requestAnimationFrame(animate);
}

//Creates a new firework every 500 milliseconds
setInterval(() => {
    fireworks.push(new Firework());
}, 500);
//Start the animation
animate();

//Run when the DOM content is fully loaded
window.addEventListener("DOMContentLoaded", () => {
    //Gets the current account from localStorage
    const saved = localStorage.getItem("currentAccount");
    //Checks if there is a saved account; If not then it returns
    if (!saved) return;
    //Convert the saved account string back to an object
    const account = JSON.parse(saved);

    // apply saved theme on page load
    document.body.className = account.activeTheme || "default";
    });