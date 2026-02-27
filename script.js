// Hardcoded users (for demo only!)
const users = {
  "admin": { password: "1234", role: "admin" },
  "user": { password: "abcd", role: "user" }
};

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (users[username] && users[username].password === password) {
    localStorage.setItem("user", username);
    showContent(users[username].role);
  } else {
    message.textContent = "Invalid credentials!";
  }
}

function showContent(role) {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("content").style.display = "block";
  document.getElementById("role-message").textContent =
    role === "admin"
      ? "You have ADMIN access!"
      : "You are logged in as USER.";

  // Authorization check
  if (role === "admin") {
    document.getElementById("admin-section").style.display = "block";

    // Show usernames and passwords
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // clear old list
    for (let username in users) {
      const li = document.createElement("li");
      li.textContent = `Username: ${username}, Password: ${users[username].password}`;
      userList.appendChild(li);
    }
  } else {
    document.getElementById("admin-section").style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("user");
  document.getElementById("login-container").style.display = "block";
  document.getElementById("content").style.display = "none";
}

// Restore session if already logged in
window.onload = function() {
  const savedUser = localStorage.getItem("user");
  if (savedUser && users[savedUser]) {
    showContent(users[savedUser].role);
  }
};

