let entries = JSON.parse(localStorage.getItem("vaultEntries")) || [];

document.getElementById("vault-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const website = document.getElementById("website").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (website && username && password) {
    entries.push({ website, username, password });
    localStorage.setItem("vaultEntries", JSON.stringify(entries));
    this.reset();
    displayEntries(entries);
  }
});

function displayEntries(data) {
  const container = document.getElementById("entries");
  container.innerHTML = "";

  data.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <strong>${entry.website}</strong><br>
      ${entry.username}<br>
      <input type="password" value="${entry.password}" readonly id="pwd-${index}" />
      <button onclick="toggleVisibility(${index})">👁️</button>
      <button onclick="deleteEntry(${index})">🗑️</button>
    `;
    container.appendChild(div);
  });
}

function toggleVisibility(index) {
  const input = document.getElementById("pwd-" + index);
  input.type = input.type === "password" ? "text" : "password";
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    entries.splice(index, 1);
    localStorage.setItem("vaultEntries", JSON.stringify(entries));
    displayEntries(entries);
  }
}

function generatePassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let pwd = "";
  for (let i = 0; i < 12; i++) {
    pwd += charset[Math.floor(Math.random() * charset.length)];
  }
  document.getElementById("password").value = pwd;
}

function searchEntries() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = entries.filter(entry =>
    entry.website.toLowerCase().includes(query) ||
    entry.username.toLowerCase().includes(query)
  );
  displayEntries(filtered);
}

// Display saved entries on load
displayEntries(entries);
