
const canvas = document.getElementById('galaxy-bg');
const ctx = canvas.getContext('2d');
let stars = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateStars();
});

function generateStars() {
  stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      angle: Math.random() * 360,
      distance: Math.random() * canvas.width / 2,
      speed: Math.random() * 0.01 + 0.001
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00000010';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  stars.forEach(star => {
    const x = canvas.width / 2 + star.distance * Math.cos(star.angle);
    const y = canvas.height / 2 + star.distance * Math.sin(star.angle);

    ctx.beginPath();
    ctx.arc(x, y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'cyan';
    ctx.fill();

    star.angle += star.speed;
  });

  requestAnimationFrame(drawStars);
}

generateStars();
drawStars();
