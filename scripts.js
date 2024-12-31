const countdownElement = document.getElementById('countdown');
const celebrationElement = document.getElementById('celebration');

function updateCountdown() {
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
  const diff = nextYear - now;

  if (diff <= 0) {
    countdownElement.classList.add('hidden');
    celebrationElement.classList.remove('hidden');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Call updateCountdown immediately and then set interval
updateCountdown();
setInterval(updateCountdown, 1000);
