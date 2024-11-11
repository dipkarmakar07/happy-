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
