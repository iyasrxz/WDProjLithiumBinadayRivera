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

const canvas = document.getElementById('boogsh');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let fireworks = [];
let particles = [];

class Firework {
    constructor(x, y) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.speed = 5 + Math.random() * 3;
        this.exploded = false;
    }

    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
                this.exploded = true;
            }
        }
    }

    explode(){
        const colors = ['#ca6666', '#457445', '#4d4dc5', '#5c4f33', '#ffffff', '#3e6565'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle(this.x, this.y, color));
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.shadowColor = 'white';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

class Particle{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        this.alpha = 1;
        this.radius = 4;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw(){
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.exploded) fireworks.splice(index, 1);
    });

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) particles.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

setInterval(() => {
    fireworks.push(new Firework());
}, 500);

animate();
            
window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("currentAccount");
    if (!saved) return;

    const account = JSON.parse(saved);

    // apply saved theme on page load
    document.body.className = account.activeTheme || "default";
    });