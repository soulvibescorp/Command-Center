// Dummy login
const USER = { username: "commander", password: "galaxy123" };

// Mock personality traits
const traits = ["Strategic Thinker", "Empath", "Rebel", "Visionary", "Analyzer"];
let crewProfiles = JSON.parse(localStorage.getItem("crewProfiles")) || [
  { name: "Lt. Orion", role: "Tactical Officer", trait: "Strategic Thinker" },
  { name: "Cmdr. Vega", role: "Pilot", trait: "Visionary" },
  { name: "Spec. Nova", role: "Engineer", trait: "Analyzer" },
];

// DOM Elements
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

// Play sounds
function playBeep() {
  beepSound.currentTime = 0;
  beepSound.play();
}
function playAccess() {
  accessSound.currentTime = 0;
  accessSound.play();
}

// Tab click behavior
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
    playBeep();
  });
});

// Login logic
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === USER.username && pass === USER.password) {
    playAccess();
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

// Space-time fetcher
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

// Render intel traits
function renderIntel() {
  const intelList = document.getElementById("intel-list");
  intelList.innerHTML = "";
  traits.forEach(trait => {
    const li = document.createElement("li");
    li.textContent = trait;
    intelList.appendChild(li);
  });
}

// Save and render profiles
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
  makeCardsDraggable();
  saveProfiles();
}

// Form submission for adding crew
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
      photo: reader.result || null
    };
    crewProfiles.push(newProfile);
    saveProfiles();
    renderProfiles();
    e.target.reset();
  };

  if (photoInput.files.length > 0) {
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    reader.onloadend(); // Run directly with no photo
  }
});

// Make profile cards draggable
function makeCardsDraggable() {
  const cards = document.querySelectorAll('.profile-card');
  cards.forEach(card => {
    card.onmousedown = function (e) {
      let shiftX = e.clientX - card.getBoundingClientRect().left;
      let shiftY = e.clientY - card.getBoundingClientRect().top;

      card.style.position = 'absolute';
      card.style.zIndex = 1000;
      document.body.append(card);

      function moveAt(pageX, pageY) {
        card.style.left = pageX - shiftX + 'px';
        card.style.top = pageY - shiftY + 'px';
      }

      moveAt(e.pageX, e.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      card.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        card.onmouseup = null;
      };
    };
    card.ondragstart = () => false;
  });
}
