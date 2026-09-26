// StockSense authentication interface

document.addEventListener("DOMContentLoaded", () => {
    const loginView = document.getElementById("loginView");
    const signupView = document.getElementById("signupView");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toast = document.getElementById("toast");
    const openSignup = document.getElementById("openSignup");
    const openLogin = document.getElementById("openLogin");
    const forgotPassword = document.getElementById("forgotPassword");

    function showView(name) {
        const login = name === "login";
        loginView.hidden = !login;
        signupView.hidden = login;
        clearErrors();

        const firstInput = document.getElementById(
            login ? "loginId" : "signupName"
        );
        firstInput.focus();
    }

    openSignup.addEventListener("click", () => showView("signup"));
    openLogin.addEventListener("click", () => showView("login"));

    document.querySelectorAll("[data-password-target]").forEach((button) => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.passwordTarget);
            const hidden = input.type === "password";
            input.type = hidden ? "text" : "password";
            button.textContent = hidden ? "Hide" : "Show";
        });
    });

    function setError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        input.setAttribute("aria-invalid", message ? "true" : "false");
        error.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".field-error").forEach((item) => {
            item.textContent = "";
        });
        document.querySelectorAll("input").forEach((input) => {
            input.removeAttribute("aria-invalid");
        });
    }

    const validLoginId = (value) => /^[A-Za-z0-9_]{6,20}$/.test(value);
    const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validPassword = (value) =>
        value.length >= 8 &&
        /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[^A-Za-z0-9]/.test(value);

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();

        const loginId = document.getElementById("loginId").value.trim();
        const password = document.getElementById("loginPassword").value;
        let valid = true;

        if (!loginId) {
            setError("loginId", "loginIdError", "Enter your login ID.");
            valid = false;
        } else if (!validLoginId(loginId)) {
            setError("loginId", "loginIdError", "Use 6 to 20 letters, numbers or underscores.");
            valid = false;
        }

        if (!password) {
            setError("loginPassword", "loginPasswordError", "Enter your password.");
            valid = false;
        }

        if (valid) {
            showToast("Form validated. Authentication can be connected next.");
        }
    });

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();

        const name = document.getElementById("signupName").value.trim();
        const loginId = document.getElementById("signupId").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        let valid = true;

        if (name.length < 2) {
            setError("signupName", "signupNameError", "Enter your full name.");
            valid = false;
        }
        if (!loginId) {
            setError("signupId", "signupIdError", "Choose a login ID.");
            valid = false;
        } else if (!validLoginId(loginId)) {
            setError("signupId", "signupIdError", "Use 6 to 20 letters, numbers or underscores.");
            valid = false;
        }
        if (!email) {
            setError("signupEmail", "signupEmailError", "Enter your email address.");
            valid = false;
        } else if (!validEmail(email)) {
            setError("signupEmail", "signupEmailError", "Enter a valid email address.");
            valid = false;
        }
        if (!password) {
            setError("signupPassword", "signupPasswordError", "Create a password.");
            valid = false;
        } else if (!validPassword(password)) {
            setError("signupPassword", "signupPasswordError", "Use 8+ characters with uppercase, lowercase, number and special character.");
            valid = false;
        }
        if (password !== confirmPassword) {
            setError("confirmPassword", "confirmPasswordError", "Passwords do not match.");
            valid = false;
        }

        if (valid) {
            showToast("Form validated. Account creation can be connected next.");
        }
    });

    forgotPassword.addEventListener("click", () => {
        const loginId = document.getElementById("loginId").value.trim();
        if (!loginId) {
            setError("loginId", "loginIdError", "Enter your login ID first.");
            document.getElementById("loginId").focus();
            return;
        }
        showToast("Password recovery can be connected next.");
    });

    let toastTimer;
    function showToast(message) {
        clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add("is-visible");
        toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
    }

    showView("login");
});
