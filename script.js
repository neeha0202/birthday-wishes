function updateCountdown() {
  const birthDate = new Date("2003-06-12T00:00:00"); // Change to actual birthday
  const now = new Date();
  const diff = now - birthDate;

  const years = now.getFullYear() - birthDate.getFullYear();
  const months = now.getMonth() - birthDate.getMonth();
  const days = now.getDate() - birthDate.getDate();
  const totalSeconds = Math.floor(diff / 1000);

  let calcDate = new Date(diff);

  const weeks = Math.floor(totalSeconds / (7 * 24 * 60 * 60));
  const hours = calcDate.getUTCHours();
  const minutes = calcDate.getUTCMinutes();
  const seconds = calcDate.getUTCSeconds();

  document.getElementById("years").innerText = years;
  document.getElementById("months").innerText = months >= 0 ? months : months + 12;
  document.getElementById("weeks").innerText = weeks;
  document.getElementById("days").innerText = days >= 0 ? days : days + 30;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // 🎉 Enhancement: Show special message during birthday month (June)
  const birthdayTitle = document.getElementById("birthday-title");
  if (now.getMonth() === 5) { // June is month 5 (0-based index)
    birthdayTitle.innerText = "🎂 A WISH MANY MORE HAPPY RETURN OF DAY MY SWEETHEART FOREVER! 🎉";
    birthdayTitle.style.color = "#ff4081";
    birthdayTitle.style.textShadow = "0 0 10px #ff69b4";
  }
}


setInterval(updateCountdown, 1000);
updateCountdown();

function like() {
  const likeCount = document.getElementById("like-count");
  likeCount.innerText = parseInt(likeCount.innerText) + 1;
}
// Background music toggle
function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

// Dark/Light mode toggle
function toggleMode() {
  document.body.classList.toggle("light-mode");
}
// Popup Message
function showPopup() {
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Share API
function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'Happy Birthday!',
      text: 'Celebrate with me 🎉🎂',
      url: window.location.href
    }).catch(console.error);
  } else {
    alert("Share not supported in this browser.");
  }
}

// Toggle Animation (pause balloons & confetti)
let animationEnabled = true;
function toggleAnimation() {
  animationEnabled = !animationEnabled;
  document.querySelector('.balloons').style.display = animationEnabled ? 'block' : 'none';
  document.getElementById('confetti-canvas').style.display = animationEnabled ? 'block' : 'none';
}

// Confetti Animation
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = Array.from({ length: 150 }, () => ({
  x: Math.random() * confettiCanvas.width,
  y: Math.random() * confettiCanvas.height,
  r: Math.random() * 6 + 4,
  d: Math.random() * 50 + 10,
  color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  tilt: Math.random() * 10 - 10,
  tiltAngle: 0,
  tiltAngleIncrement: Math.random() * 0.08 + 0.04
}));

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.tiltAngle += c.tiltAngleIncrement;
    c.tilt = Math.sin(c.tiltAngle) * 15;

    if (c.y > confettiCanvas.height) {
      c.x = Math.random() * confettiCanvas.width;
      c.y = -10;
    }
  });
}

setInterval(() => {
  if (animationEnabled) drawConfetti();
}, 30);

window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
// Daily Progress Fill
function updateProgress() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const total = end - start;
  const elapsed = now - start;
  const percentage = (elapsed / total) * 100;

  document.getElementById("progress-fill").style.width = `${percentage}%`;
}
setInterval(updateProgress, 60000);
updateProgress();

// Wish Box Logic
function openWishBox() {
  document.getElementById("wish-box").classList.toggle("hidden");
}
function submitWish() {
  const text = document.querySelector("#wish-box textarea").value.trim();
  if (text) {
    alert("🎉 Your wish has been sent: " + text);
    document.querySelector("#wish-box textarea").value = '';
    document.getElementById("wish-box").classList.add("hidden");
  } else {
    alert("Please enter a wish first!");
  }
}

// Animated Floating Balloons (using CSS-injected style)
const balloonContainer = document.querySelector('.balloons');
for (let i = 0; i < 20; i++) {
  const balloon = document.createElement('div');
  balloon.classList.add('float-balloon');
  balloon.style.left = `${Math.random() * 100}%`;
  balloon.style.animationDuration = `${5 + Math.random() * 5}s`;
  balloonContainer.appendChild(balloon);
}
