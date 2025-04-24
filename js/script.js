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
