// Dummy login
const USER = { username: "commander", password: "galaxy123" };

// Mock personality traits
const traits = ["Strategic Thinker", "Empath", "Rebel", "Visionary", "Analyzer"];
const crewProfiles = [
  { name: "Lt. Orion", role: "Tactical Officer", trait: "Strategic Thinker" },
  { name: "Cmdr. Vega", role: "Pilot", trait: "Visionary" },
  { name: "Spec. Nova", role: "Engineer", trait: "Analyzer" },
];

// DOM
const loginForm = document.getElementById("login-form");
const loginContainer = document.getElementById("login-container");
const dashboard = document.getElementById("dashboard");
const loginError = document.getElementById("login-error");
const commanderName = document.getElementById("commander-name");
const logoutBtn = document.getElementById("logout-button");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const beepSound = document.getElementById("beep-sound");
const accessSound = document.getElementById("access-sound");

function playBeep() {
  beepSound.currentTime = 0;
  beepSound.play();
}

function playAccess() {
  accessSound.currentTime = 0;
  accessSound.play();
}

// Add sound on tab click
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
    playBeep();
  });
});

// Login success
if (user === USER.username && pass === USER.password) {
  playAccess();
  ...
}


// Login logic
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === USER.username && pass === USER.password) {
    loginContainer.classList.add("hidden");
    dashboard.classList.remove("hidden");
    commanderName.textContent = user;
    renderIntel();
    renderProfiles();
  } else {
    loginError.textContent = "Access Denied.";
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  loginContainer.classList.remove("hidden");
  dashboard.classList.add("hidden");
  loginForm.reset();
  loginError.textContent = "";
});

// Tab Switching
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Render traits
function renderIntel() {
  const intelList = document.getElementById("intel-list");
  intelList.innerHTML = "";
  traits.forEach(trait => {
    const li = document.createElement("li");
    li.textContent = trait;
    intelList.appendChild(li);
  });
}

// Render crew profiles
let crewProfiles = JSON.parse(localStorage.getItem("crewProfiles")) || [
  { name: "Lt. Orion", role: "Tactical Officer", trait: "Strategic Thinker" },
  { name: "Cmdr. Vega", role: "Pilot", trait: "Visionary" },
  { name: "Spec. Nova", role: "Engineer", trait: "Analyzer" },
];

function saveProfiles() {
  localStorage.setItem("crewProfiles", JSON.stringify(crewProfiles));
}

function renderProfiles() {
  const container = document.getElementById("profile-cards");
  container.innerHTML = "";
  crewProfiles.forEach(profile => {
    const card = document.createElement("div");
    card.classList.add("profile-card");
    card.innerHTML = `
      <h4>${profile.name}</h4>
      <p><strong>Role:</strong> ${profile.role}</p>
      <p><strong>Trait:</strong> ${profile.trait}</p>
    `;
    container.appendChild(card);
  });
  saveProfiles();
}

