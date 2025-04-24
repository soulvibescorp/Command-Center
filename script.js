// Global Variables
let commanderName = "Commander 42";

// Function to Play Sound
function playSound(id) {
  const sound = document.getElementById(id);
  sound.play();
}

// Tab Switch Function
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    playSound('beep-sound');
  });
});

// Logout Function
document.getElementById('logout-button').addEventListener('click', () => {
  alert('Logging out...');
  // Add real logout functionality later
});

// Download Crew Log (Mock)
function downloadCrewLog() {
  const log = "Mission Log - Galactic Overview\nStatus: Active\nCrew: 5 Members\nMission Progress: 30%";
  const blob = new Blob([log], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mission_log.txt';
  link.click();
}

// Function to Fetch and Display Crew Profiles
async function fetchCrewProfiles() {
  try {
    const response = await fetch('https://api.example.com/crew-profiles');  // Replace with your real API
    const crewData = await response.json();

    const profileCards = document.getElementById('profile-cards');
    profileCards.innerHTML = crewData.map(profile => `
      <div class="profile-card">
        <img src="${profile.avatar}" alt="${profile.name}'s Avatar">
        <h4>${profile.name}</h4>
        <p>${profile.role}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching crew profiles:', error);
  }
}

// Call function to fetch and render profiles on page load
fetchCrewProfiles();

// Mock Space Weather Data
function loadMockSpaceWeather() {
  const solarFlare = ["Low", "Moderate", "High", "Extreme"];
  const geomagnetic = ["Quiet", "Unsettled", "Active", "Storm"];

  document.getElementById('solar-flare').textContent = solarFlare[Math.floor(Math.random() * solarFlare.length)];
  document.getElementById('geomagnetic').textContent = geomagnetic[Math.floor(Math.random() * geomagnetic.length)];
}

// Function to Render Star Map Based on Space Weather Data
function renderStarMap(spaceWeatherData) {
  // Create a 3D scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('star-map') });
  renderer.setSize(600, 400);

  // Create stars as small spheres
  const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const starCount = 100; // Number of stars

  for (let i = 0; i < starCount; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000
    );
    scene.add(star);
  }

  const crewData = [
    { name: "Zara", role: "Engineer", status: "Active" },
    { name: "Kiro", role: "Pilot", status: "On Mission" },
    { name: "Mira", role: "Analyst", status: "Docked" }
  ];

  function loadCrewProfiles() {
    const container = document.getElementById('profile-cards');
    container.innerHTML = "";
    crewData.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('profile-card');
      card.innerHTML = `
        <h4>${member.name}</h4>
        <p>Role: ${member.role}</p>
        <p>Status: ${member.status}</p>
      `;
      container.appendChild(card);
    });
  }

  function drawStarMap() {
    const canvas = document.getElementById('star-map');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  }

  setInterval(drawStarMap, 5000);

  // Add a star effect based on solar flare activity
  if (spaceWeatherData && spaceWeatherData.solarFlareActivity === 'High') {
    starMaterial.color.set(0xFF0000); // Change color for solar flares
  }

  // Set up the camera position
  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.001;
    scene.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();
}

function updateSpaceWeather() {
  document.getElementById('solar-flare').innerText = 'Moderate Activity';
  document.getElementById('geomagnetic').innerText = 'Kp Index: 4 (Quiet)';
}
setInterval(updateSpaceWeather, 10000); // every 10s

function simulateSensorData() {
  const statuses = ['All Clear', 'Anomaly Detected', 'Lifeform Scan Active', 'Radiation Spike'];
  const reading = statuses[Math.floor(Math.random() * statuses.length)];
  document.getElementById('sensor-status').innerText = reading;
}
setInterval(simulateSensorData, 4000); // every 4 seconds

function searchAnalytics() {
  const query = document.getElementById('analytics-search').value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }
  // Simulated Result Display
  alert(`Searching analytics tools for "${query}"...`);
  // Future: Real filter logic per panel
}

// Intel Tab Switching
const intelTabs = document.querySelectorAll('.intel-tool-tab');
intelTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    intelTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');

    document.querySelectorAll('.intel-tab-panel').forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === target) {
        panel.classList.add('active');
      }
    });
  });
});

// Function to Fetch Real-Time Space Weather Data
async function fetchSpaceWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/space-weather?latitude=0&longitude=0'); // Placeholder API
    const data = await response.json();

    // Update UI with space weather data
    document.getElementById('solar-flare').innerText = data.solarFlareActivity || 'Loading...';
    document.getElementById('geomagnetic').innerText = data.geomagneticIndex || 'Loading...';
    
    // Update the Star Map based on the data (e.g., Solar Flare activity affecting the map)
    renderStarMap(data);
  } catch (error) {
    console.error("Error fetching space weather data", error);
    document.getElementById('solar-flare').innerText = "Error fetching data.";
    document.getElementById('geomagnetic').innerText = "Error fetching data.";
  }
}

document.getElementById('logout-button').addEventListener('click', () => {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  simulateSensorData();
  updateSpaceWeather();
  drawStarMap();
});

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username && password) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('commander-name').innerText = username;
    document.getElementById('dashboard').classList.remove('hidden');
    playSound('access-sound');
  } else {
    alert('Access Denied: Credentials required.');
  }
}

// Call the function to fetch space weather data
fetchSpaceWeather();

// Initialize on Load
window.onload = function() {
  loadMockSpaceWeather(); // Load mock space weather
  document.getElementById('commander-name').textContent = commanderName;
};
