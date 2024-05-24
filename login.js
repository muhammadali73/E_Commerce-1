const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const loginSuccessMsg = document.getElementById("login-success");
const mainHolder = document.getElementById("main-holder");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Reset messages and remove shake class
    loginErrorMsg.style.opacity = 0;
    loginErrorMsg.style.visibility = "hidden";
    loginSuccessMsg.style.opacity = 0;
    loginSuccessMsg.style.visibility = "hidden";
    mainHolder.classList.remove('shake');

    const username = loginForm['username'].value;
    const password = loginForm['password'].value;

    // Collect error messages
    let errorMessage = "";
    if (!username) {
        errorMessage += "Error: The username field is empty.<br>";
    }

    if (!password) {
        errorMessage += "Error: The password field is empty.<br>";
    }

    if (errorMessage) {
        loginErrorMsg.innerHTML = errorMessage;
        loginErrorMsg.style.opacity = 1;
        loginErrorMsg.style.visibility = "visible";
        mainHolder.classList.add('shake'); // Apply shake animation
        return;
    }

    // Get stored user details from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        loginErrorMsg.style.opacity = 0; // Hide error message
        loginErrorMsg.style.visibility = "hidden";
        loginSuccessMsg.style.opacity = 1; // Show success message
        loginSuccessMsg.style.visibility = "visible";
    } else {
        loginErrorMsg.innerHTML = "Invalid username and/or password.";
        loginErrorMsg.style.opacity = 1; // Show error message
        loginErrorMsg.style.visibility = "visible";
        loginSuccessMsg.style.opacity = 0; // Hide success message
        loginSuccessMsg.style.visibility = "hidden";
        mainHolder.classList.add('shake'); // Apply shake animation
    }
});

const passwordField = document.getElementById("password-field");
const togglePasswordButton = document.getElementById("toggle-password");

togglePasswordButton.addEventListener("click", () => {
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  
  // Change the button icon based on the password visibility
  togglePasswordButton.classList.toggle("visible");
});
