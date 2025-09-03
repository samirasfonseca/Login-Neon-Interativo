// -----------------------------
// Partículas Interativas
// -----------------------------
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let colors = ['#72ddf7', '#00a6fb', '#ffffff']; // cores iniciais do modo dark

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Classe da Partícula
class Particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

// Inicializa partículas
function initParticles(){
    particlesArray = [];
    for(let i=0; i<120; i++){
        particlesArray.push(new Particle());
    }
}

// Anima partículas
function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Partículas seguem o mouse
let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    particlesArray.forEach(p => {
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 100){
            p.x += dx/20;
            p.y += dy/20;
        }
    });
});

// -----------------------------
// Login funcional
// -----------------------------
document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    if(username === "admin" && password === "1234"){
        message.style.color = "#00ff99";
        message.textContent = "Login bem-sucedido! Redirecionando...";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    } else {
        message.style.color = "#ff4c4c";
        message.textContent = "Usuário ou senha incorretos!";
    }
});

// -----------------------------
// Modo Dark/Light
// -----------------------------
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Atualizar cores das partículas
    if(document.body.classList.contains('light-mode')){
        colors[0] = '#fc2f00';
        colors[1] = '#fb6f92';
        colors[2] = '#3772ff';
    } else {
        colors[0] = '#72ddf7';
        colors[1] = '#00a6fb';
        colors[2] = '#ffffff';
    }

    // Atualiza cores das partículas existentes
    particlesArray.forEach(p => {
        p.color = colors[Math.floor(Math.random() * colors.length)];
    });
});

// Inicializa tudo
initParticles();
animateParticles();
