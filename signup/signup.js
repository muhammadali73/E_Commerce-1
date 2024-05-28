const signupForm = document.getElementById("signup-form");
const signupButton = document.getElementById("signup-form-submit");
const signupErrorMsg = document.getElementById("signup-error-msg");
const signupSuccessMsg = document.getElementById("signup-success-msg");
const mainHolder = document.getElementById("main-holder");

const passwordField = document.getElementById("signup-password-field");
const confirmPasswordField = document.getElementById("signup-confirm-password-field");
const togglePasswordFieldButton = document.getElementById("toggle-password");
const toggleConfirmPasswordFieldButton = document.getElementById("toggle-confirm-password");

togglePasswordFieldButton.addEventListener("click", () => {
  togglePasswordVisibility(passwordField, togglePasswordFieldButton);
});

toggleConfirmPasswordFieldButton.addEventListener("click", () => {
  togglePasswordVisibility(confirmPasswordField, toggleConfirmPasswordFieldButton);
});

function togglePasswordVisibility(field, button) {
  const type = field.getAttribute("type") === "password" ? "text" : "password";
  field.setAttribute("type", type);

  // Change the button icon based on the password visibility
  button.classList.toggle("visible");
}

// Hide messages initially
signupErrorMsg.style.visibility = "hidden";
signupSuccessMsg.style.visibility = "hidden";

signupButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Reset messages and remove shake class
    signupErrorMsg.style.visibility = "hidden";
    signupSuccessMsg.style.visibility = "hidden";
    mainHolder.classList.remove('shake');

    const email = signupForm['email'].value;
    const username = signupForm['username'].value;
    const password = signupForm['password'].value;
    const confirmPassword = signupForm['confirm-password'].value;

    // Error messages array
    let errorMessages = [];

    // Check for empty fields and add specific error messages
    if (!email) {
        errorMessages.push("Error: The email field is empty.");
    }
    if (!username) {
        errorMessages.push("Error: The username field is empty.");
    }
    if (!password) {
        errorMessages.push("Error: The password field is empty.");
    }
    if (!confirmPassword) {
        errorMessages.push("Error: The confirm password field is empty.");
    }

    // Show all error messages if there are any
    if (errorMessages.length > 0) {
        signupErrorMsg.innerHTML = errorMessages.join("<br>");
        signupErrorMsg.style.visibility = "visible"; // Show error messages
        mainHolder.classList.add('shake'); // Apply shake animation
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,15}$/;
    if (!passwordRegex.test(password)) {
        signupErrorMsg.innerHTML = "Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
        signupErrorMsg.style.visibility = "visible"; // Show error message
        mainHolder.classList.add('shake'); // Apply shake animation
        return;
    }

    if (password !== confirmPassword) {
        signupErrorMsg.innerHTML = "Passwords do not match.";
        signupErrorMsg.style.visibility = "visible"; // Show error message
        mainHolder.classList.add('shake'); // Apply shake animation
        return;
    }

    // If all fields are filled and password validation passes
    if (email && username && password && confirmPassword) {
        // Save user details to localStorage
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        
        signupErrorMsg.style.visibility = "hidden"; // Hide error message
        signupSuccessMsg.style.visibility = "visible"; // Show success message
        
        // Redirect to login page after a delay to show success message
        setTimeout(() => {
            window.location.href = '../index.html'; // Redirect to login page
        }, 1000); // Delay in milliseconds (1 second in this case)
    } else {
        signupErrorMsg.innerHTML = "Please fill in all fields.";
        signupErrorMsg.style.visibility = "visible"; // Show error message
        mainHolder.classList.add('shake'); // Apply shake animation
    }
});