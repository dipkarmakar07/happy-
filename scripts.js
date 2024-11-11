// Remove unused GSAP animation since there's no .box element
function createStar() {
    const star = document.createElement('i');
    star.className = 'fas fa-star falling-star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 3000);
}

setInterval(createStar, 300);

const giftBox = document.querySelector('.gift-box-1');
const teddy = document.querySelector('.gift-box-2');

giftBox.addEventListener('click', () => {
    giftBox.style.display = 'none';
    teddy.style.display = 'block';
    
    setTimeout(() => {
        giftBox.style.display = 'block';
        teddy.style.display = 'none';
    }, 6000);
});

// ... existing code ...

// Method 1: Try to play as soon as possible
window.addEventListener('load', function() {
    const audio = document.getElementById('birthdaySong');
    audio.loop = true;
    
    // Try multiple times to start playing
    const playAttempt = setInterval(() => {
        audio.play()
        .then(() => {
            clearInterval(playAttempt);
        })
        .catch((error) => {
            console.log("Play prevented by browser", error);
        });
    }, 1000);
});

// Method 2: Play on any user interaction with the page
document.addEventListener('click', function() {
    const audio = document.getElementById('birthdaySong');
    audio.loop = true;
    audio.play();
}, { once: true }); // Will only trigger once