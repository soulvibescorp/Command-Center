// === Audio Setup ===
const audio = new Audio("https://cdn.pixabay.com/audio/2023/03/01/audio_f6fa2e5f4a.mp3");
let isPlaying = false;

// === Visualizer Setup ===
const visualizer = document.getElementById("visualizer");
const ctx = visualizer.getContext("2d");
visualizer.width = window.innerWidth;
visualizer.height = 100;
let bars = 50;

// === Beep Sound for Tabs ===
function playBeep() {
  const beep = new Audio("https://cdn.pixabay.com/audio/2022/10/11/audio_dfc78e7d9b.mp3");
  beep.play();
}

// === Spacebar or Touch to Play Audio ===
document.addEventListener("keydown", e => {
  if (e.code === "Space") togglePlay();
});
document.addEventListener("click", () => togglePlay());

function togglePlay() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    animateVisualizer();
  } else {
    audio.pause();
    isPlaying = false;
  }
}

// === Visualizer Animation ===
function animateVisualizer() {
  if (!isPlaying) return;
  ctx.clearRect(0, 0, visualizer.width, visualizer.height);
  for (let i = 0; i < bars; i++) {
    let x = i * (visualizer.width / bars);
    let height = Math.random() * 100;
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 60%)`;
    ctx.fillRect(x, visualizer.height - height, visualizer.width / bars - 2, height);
  }
  requestAnimationFrame(animateVisualizer);
}

// === Tab Switching with Active Class & Sound ===
document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(panel => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");

    playBeep();

    if (target === "space-weather") {
      loadMockSpaceWeather();
      drawStarMap();
    }
  });
});

// === Mock Space Weather Data ===
function loadMockSpaceWeather() {
  const solarFlare = ["Low", "Moderate", "High", "Extreme"];
  const geomagnetic = ["Quiet", "Unsettled", "Active", "Storm"];

  document.getElementById("solar-flare").textContent =
    solarFlare[Math.floor(Math.random() * solarFlare.length)];
  document.getElementById("geomagnetic").textContent =
    geomagnetic[Math.floor(Math.random() * geomagnetic.length)];
}

// === Canvas Star Map ===
function drawStarMap() {
  const canvas = document.getElementById("star-map");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  // Draw constellation lines
  ctx.strokeStyle = "#0ff5";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 10; i++) {
    let x1 = Math.random() * canvas.width;
    let y1 = Math.random() * canvas.height;
    let x2 = x1 + Math.random() * 100;
    let y2 = y1 + Math.random() * 100;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

// Optional: Resize canvas if window resizes
window.addEventListener("resize", () => {
  visualizer.width = window.innerWidth;
});
