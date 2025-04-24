// Global Variables
let commanderName = "Commander 42";

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

// Mock Space Weather Data
function loadMockSpaceWeather() {
  const solarFlare = ["Low", "Moderate", "High", "Extreme"];
  const geomagnetic = ["Quiet", "Unsettled", "Active", "Storm"];

  document.getElementById('solar-flare').textContent = solarFlare[Math.floor(Math.random() * solarFlare.length)];
  document.getElementById('geomagnetic').textContent = geomagnetic[Math.floor(Math.random() * geomagnetic.length)];
}

// Function to fetch real-time space weather data
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


// Play Sound
function playSound(id) {
  const sound = document.getElementById(id);
  sound.play();
}

// Initialize on Load
window.onload = function() {
  loadMockSpaceWeather(); // Load mock space weather
  document.getElementById('commander-name').textContent = commanderName;
};
