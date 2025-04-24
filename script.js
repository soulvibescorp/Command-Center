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

// Call the function to fetch space weather data
fetchSpaceWeather();

function analyzePersonality() {
  const crewName = document.getElementById('intel-name').value;
  if (crewName) {
    const traits = {
      "Curiosity": Math.random(),
      "Risk-Taking": Math.random(),
      "Leadership": Math.random(),
      "Stress Resistance": Math.random()
    };
    const traitMatrix = document.getElementById('trait-matrix');
    traitMatrix.innerHTML = Object.entries(traits)
      .map(([trait, val]) => `
        <div class="trait">
          <strong>${trait}</strong>: ${(val * 100).toFixed(2)}%
        </div>
      `).join('');
    playSound('access-sound');
  }
}

// Function to Analyze Crew Personality (Mock)
function analyzePersonality() {
  const crewName = document.getElementById('intel-name').value;
  
  if (crewName) {
    // Simulate an AI personality matrix (Replace with real AI or algorithm)
    const personalityTraits = {
      "Curiosity": Math.random(),
      "Risk-Taking": Math.random(),
      "Leadership": Math.random(),
      "Stress Resistance": Math.random()
    };

    const traitMatrix = document.getElementById('trait-matrix');
    traitMatrix.innerHTML = Object.entries(personalityTraits)
      .map(([trait, value]) => `
        <div class="trait">
          <span>${trait}</span>: <span>${(value * 100).toFixed(2)}%</span>
        </div>
      `)
      .join('');
  }
}

// Initialize on Load
window.onload = function() {
  loadMockSpaceWeather(); // Load mock space weather
  document.getElementById('commander-name').textContent = commanderName;
};
