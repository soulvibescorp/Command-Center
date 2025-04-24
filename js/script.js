// 1. Load mock space weather data
function loadMockSpaceWeather() {
  const solarFlare = ["Low", "Moderate", "High", "Extreme"];
  const geomagnetic = ["Quiet", "Unsettled", "Active", "Storm"];

  document.getElementById("solar-flare").textContent =
    solarFlare[Math.floor(Math.random() * solarFlare.length)];
  document.getElementById("geomagnetic").textContent =
    geomagnetic[Math.floor(Math.random() * geomagnetic.length)];
}

// 2. Draw canvas star map
function drawStarMap() {
  const canvas = document.getElementById("star-map");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  // Add constellation lines
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
