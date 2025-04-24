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
function fetchSpaceTime() {
  fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
    .then(res => res.json())
    .then(data => {
      const spaceTime = document.createElement("p");
      spaceTime.textContent = `Galactic Time: ${data.datetime}`;
      document.getElementById("overview").appendChild(spaceTime);
    })
    .catch(err => console.error("API Error:", err));
}

fetchSpaceTime();

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
      <img src="${profile.photo || 'assets/default-avatar.png'}" alt="Avatar" class="avatar"/>
      <h4>${profile.name}</h4>
      <p><strong>Role:</strong> ${profile.role}</p>
      <p><strong>Trait:</strong> ${profile.trait}</p>
    `;
    container.appendChild(card);
  });
  saveProfiles();
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));

    tab.classList.add('active');
    const targetPanel = document.getElementById(tab.dataset.tab);
    targetPanel.classList.add('active');

    document.getElementById("beep-sound").play();
  });
});


document.getElementById("crewForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("crew-name").value;
  const role = document.getElementById("crew-role").value;
  const trait = document.getElementById("crew-trait").value;
  const photoInput = document.getElementById("crew-photo");

  const reader = new FileReader();
  reader.onloadend = () => {
    const newProfile = {
      name,
      role,
      trait,
      photo: reader.result // base64 encoded image
    };
    crewProfiles.push(newProfile);
    saveProfiles();
    renderProfiles();
    this.reset();
  };

  if (photoInput.files.length > 0) {
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    // If no photo, use default
    reader.onloadend();
  }
});
