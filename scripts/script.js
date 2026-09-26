// ========================================
// ELEMENT REFERENCES
// ========================================

const loginContent = document.getElementById("loginContent");
const signupContent = document.getElementById("signupContent");

const showSignupButton = document.getElementById("showSignup");
const showLoginButton = document.getElementById("showLogin");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const forgotPasswordButton =
    document.getElementById("forgotPassword");

const toast = document.getElementById("toast");


// ========================================
// SWITCH LOGIN / SIGN UP
// ========================================

function showLogin() {

    signupContent.classList.remove("active");

    loginContent.classList.add("active");

    clearErrors();
}


function showSignup() {

    loginContent.classList.remove("active");

    signupContent.classList.add("active");

    clearErrors();
}


// Login -> Sign Up
showSignupButton.addEventListener("click", showSignup);


// Sign Up -> Login
showLoginButton.addEventListener("click", showLogin);


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

const passwordToggleButtons =
    document.querySelectorAll(".password-toggle");


passwordToggleButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Get the input ID from data-target
        const targetId = button.dataset.target;

        // Find the password input
        const passwordInput =
            document.getElementById(targetId);


        // Change password to text
        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            button.textContent = "Hide";

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        }

        // Change text back to password
        else {

            passwordInput.type = "password";

            button.textContent = "Show";

            button.setAttribute(
                "aria-label",
                "Show password"
            );
        }

    });

});


// ========================================
// SHOW ERROR MESSAGE
// ========================================

function setError(inputId, errorId, message) {

    // Get input
    const input =
        document.getElementById(inputId);

    // Get error message element
    const error =
        document.getElementById(errorId);


    // Show red border
    input.style.borderColor =
        message ? "#d94a4a" : "";


    // Show error message
    error.textContent = message;
}


// ========================================
// CLEAR ALL ERRORS
// ========================================

function clearErrors() {

    // Find all error elements
    const errorElements =
        document.querySelectorAll(".error");


    // Remove error messages
    errorElements.forEach((error) => {

        error.textContent = "";

    });


    // Find all inputs
    const inputs =
        document.querySelectorAll("input");


    // Remove red borders
    inputs.forEach((input) => {

        input.style.borderColor = "";

    });

}


// ========================================
// EMAIL VALIDATION
// ========================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// ========================================
// LOGIN ID VALIDATION
// ========================================

function isValidLoginId(loginId) {

    /*
        Login ID rules:

        Minimum 6 characters
        Maximum 20 characters

        Allowed:
        A-Z
        a-z
        0-9
        _
    */

    return /^[A-Za-z0-9_]{6,20}$/.test(loginId);
}


// ========================================
// PASSWORD VALIDATION
// ========================================

function isValidPassword(password) {

    /*
        Password must contain:

        8 or more characters
        At least one lowercase letter
        At least one uppercase letter
        At least one number
        At least one special character
    */

    return (
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
}


// ========================================
// LOGIN FORM
// ========================================

loginForm.addEventListener("submit", (event) => {

    // Stop page refresh
    event.preventDefault();


    // Remove old errors
    clearErrors();


    // Get Login ID
    const loginId =
        document.getElementById("loginId")
            .value
            .trim();


    // Get password
    const password =
        document.getElementById("loginPassword")
            .value;


    // Validation status
    let isValid = true;


    // ====================================
    // CHECK LOGIN ID
    // ====================================

    if (!loginId) {

        setError(
            "loginId",
            "loginIdError",
            "Please enter your login ID."
        );

        isValid = false;

    }

    else if (!isValidLoginId(loginId)) {

        setError(
            "loginId",
            "loginIdError",
            "Login ID must contain 6–20 letters, numbers, or underscores."
        );

        isValid = false;
    }


    // ====================================
    // CHECK PASSWORD
    // ====================================

    if (!password) {

        setError(
            "loginPassword",
            "loginPasswordError",
            "Please enter your password."
        );

        isValid = false;
    }


    // ====================================
    // STOP IF INVALID
    // ====================================

    if (!isValid) {

        return;
    }


    // ====================================
    // LOGIN SUCCESS DEMO
    // ====================================

    /*
        IMPORTANT:

        This is only frontend validation.

        A real login system should send
        these details to your backend.
    */

    showToast(
        "Login details look valid. Connecting..."
    );


    // Clear form
    loginForm.reset();

});


// ========================================
// SIGN UP FORM
// ========================================

signupForm.addEventListener("submit", (event) => {

    // Stop page refresh
    event.preventDefault();


    // Clear previous errors
    clearErrors();


    // ====================================
    // GET FORM VALUES
    // ====================================

    const name =
        document.getElementById("signupName")
            .value
            .trim();


    const loginId =
        document.getElementById("signupId")
            .value
            .trim();


    const email =
        document.getElementById("signupEmail")
            .value
            .trim();


    const password =
        document.getElementById("signupPassword")
            .value;


    const confirmPassword =
        document.getElementById("confirmPassword")
            .value;


    // Validation status
    let isValid = true;


    // ====================================
    // CHECK NAME
    // ====================================

    if (name.length < 2) {

        setError(
            "signupName",
            "signupNameError",
            "Please enter your full name."
        );

        isValid = false;
    }


    // ====================================
    // CHECK LOGIN ID
    // ====================================

    if (!loginId) {

        setError(
            "signupId",
            "signupIdError",
            "Please choose a login ID."
        );

        isValid = false;

    }

    else if (!isValidLoginId(loginId)) {

        setError(
            "signupId",
            "signupIdError",
            "Use 6–20 letters, numbers, or underscores."
        );

        isValid = false;
    }


    // ====================================
    // CHECK EMAIL
    // ====================================

    if (!email) {

        setError(
            "signupEmail",
            "signupEmailError",
            "Please enter your email address."
        );

        isValid = false;

    }

    else if (!isValidEmail(email)) {

        setError(
            "signupEmail",
            "signupEmailError",
            "Please enter a valid email address."
        );

        isValid = false;
    }


    // ====================================
    // CHECK PASSWORD
    // ====================================

    if (!password) {

        setError(
            "signupPassword",
            "signupPasswordError",
            "Please create a password."
        );

        isValid = false;

    }

    else if (!isValidPassword(password)) {

        setError(
            "signupPassword",
            "signupPasswordError",
            "Use 8+ characters with uppercase, lowercase, number, and special character."
        );

        isValid = false;
    }


    // ====================================
    // CHECK CONFIRM PASSWORD
    // ====================================

    if (password !== confirmPassword) {

        setError(
            "confirmPassword",
            "confirmPasswordError",
            "Passwords do not match."
        );

        isValid = false;
    }


    // ====================================
    // STOP IF INVALID
    // ====================================

    if (!isValid) {

        return;
    }


    // ====================================
    // SIGN UP SUCCESS DEMO
    // ====================================

    /*
        IMPORTANT:

        This does NOT create a real account.

        Later you can connect this form
        with Supabase / Firebase / your
        own backend.
    */

    showToast(
        "Account form is valid. Account created!"
    );


    // Clear signup form
    signupForm.reset();


    // Return to login after 1.2 seconds
    setTimeout(() => {

        showLogin();

    }, 1200);

});


// ========================================
// FORGOT PASSWORD
// ========================================

forgotPasswordButton.addEventListener(
    "click",
    () => {

        // Get Login ID
        const loginId =
            document.getElementById("loginId")
                .value
                .trim();


        // Check if Login ID is empty
        if (!loginId) {

            setError(
                "loginId",
                "loginIdError",
                "Enter your login ID first."
            );


            // Put cursor in Login ID
            document
                .getElementById("loginId")
                .focus();


            return;
        }


        // Demo message
        showToast(
            "Password reset flow would start here."
        );

    }
);


// ========================================
// TOAST MESSAGE
// ========================================

let toastTimer;


function showToast(message) {

    // Clear previous timer
    clearTimeout(toastTimer);


    // Put message inside toast
    toast.textContent = message;


    // Show toast
    toast.classList.add("show");


    // Hide toast after 3 seconds
    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}