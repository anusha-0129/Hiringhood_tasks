function registerUser() {
    let username = document.getElementById("reg-username").value.trim();
    let email = document.getElementById("reg-email").value.trim();
    let password = document.getElementById("reg-password").value.trim();

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username || !email || !password) {
        alert("All fields are required for registration.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

   
    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("Email is already registered. Please use a different email.");
        return false;
    }

    let newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    toggleForms();
    
    return false;
}

function loginUser() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    let validUser = users.find(user => user.email === email && user.password === password);
    
    if (!validUser) {
        alert("Invalid email or password.");
        return false;
    }
    
    sessionStorage.setItem("loggedInUser", validUser.username);
    showWelcomeMessage(validUser.username);
    
    return false;
}

function logout() {
    sessionStorage.removeItem("loggedInUser");
    document.getElementById("welcome-message").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
}

function toggleForms() {
    let registerSection = document.getElementById("register-section");
    let loginSection = document.getElementById("login-section");
    
    if (registerSection.style.display === "none") {
        registerSection.style.display = "block";
        loginSection.style.display = "none";
    } else {
        registerSection.style.display = "none";
        loginSection.style.display = "block";
    }
}

function showWelcomeMessage(username) {
    document.getElementById("user-name").innerText = username;
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("welcome-message").style.display = "block";
}

window.onload = function () {
    let loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showWelcomeMessage(loggedInUser);
    }
};
