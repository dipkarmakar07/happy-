const countdownElement = document.getElementById('countdown');
const celebrationElement = document.getElementById('celebration');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const titleElement = document.querySelector('h1');
const newYearSong = document.getElementById('newYearSong');

const particles = [];
let canvas, ctx;

function setupFireworks() {
    canvas = document.getElementById('fireworks');
    ctx = canvas.getContext('2d');
    
    // Handle window resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    setInterval(createParticle, 50);
    // Start animation
    animate();
}

function createParticle() {
    particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 50%, 50%)`,
        speedY: Math.random() * -15 - 5,
        speedX: Math.random() * 6 - 3,
        alpha: 1
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.1; // gravity
        p.alpha -= 0.005; // fade out
        
        // Remove particles that are off screen or faded out
        if (p.y > canvas.height || p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}

function updateCountdown() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
    const currentYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
    
    // Check if we're in January 1st
    if (now.getMonth() === 0 && now.getDate() === 1) {
        // Hide countdown and show celebration
        countdownElement.classList.add('hidden');
        titleElement.classList.add('hidden');
        showCelebration();
        return;
    }
    
    const diff = nextYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function showCelebration() {
    // Change background color to black
    document.body.style.backgroundColor = 'black';
    
    celebrationElement.classList.remove('hidden');
    
    // Play New Year song with error handling
    try {
        newYearSong.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    } catch (error) {
        console.log('Audio playback failed:', error);
    }
    
    // Create and setup fireworks
    if (!document.getElementById('fireworks')) {
        const fireworks = document.createElement('canvas');
        fireworks.id = 'fireworks';
        fireworks.style.position = 'fixed';
        fireworks.style.top = '0';
        fireworks.style.left = '0';
        fireworks.style.zIndex = '-1';
        document.body.appendChild(fireworks);
        
        setupFireworks();
    }
}

// Check if it's January 1st immediately and show celebration if it is
const now = new Date();
if (now.getMonth() === 0 && now.getDate() === 1) {
    countdownElement.classList.add('hidden');
    titleElement.classList.add('hidden');
    showCelebration();
} else {
    // Otherwise start the countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
