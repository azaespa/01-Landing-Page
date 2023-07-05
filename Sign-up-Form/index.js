const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const createAccountBtn = document.getElementById("create-account");
const signupWGoogle = document.getElementById("signup-w-google");
const signupForm = document.querySelector(".signup-form");

let timer = null;
let isConfirmPasswordValid = false;

email.addEventListener("keyup", (e) => {
    const emailAdd = e.target.value;
    const indexOfAt = emailAdd.indexOf("@");
    const indexOfDot = emailAdd.indexOf(".");
    
    email.classList.remove("invalid")
    
    clearTimeout(timer);
    
    timer = setTimeout(() => {
        if (email.validity.valid && indexOfAt > 1 &&
            indexOfDot > (indexOfAt + 1) && indexOfDot != (emailAdd.length - 1)) {
            email.classList.remove("invalid")
        } else {
            email.classList.add("invalid");
        }
    }, 500);
})

email.addEventListener("change", (e) => {
    const emailAdd = e.target.value;
    const indexOfAt = emailAdd.indexOf("@");
    const indexOfDot = emailAdd.indexOf(".");

    if (email.validity.valid && indexOfAt > 1 &&
        indexOfDot > (indexOfAt + 1) && indexOfDot != (emailAdd.length - 1)) {
        email.classList.remove("invalid")
    } else {
        email.classList.add("invalid");
    }
})

password.addEventListener("keyup", () => {
    password.classList.remove("invalid");
    clearTimeout(timer);
    
    timer = setTimeout(() => {
        if (password.value.length < 8) {
            password.classList.add("invalid");
        } else {
            password.classList.remove("invalid");
        }        
    }, 500);
})

password.addEventListener("change", () => {
    if (password.value.length < 8) {
        password.classList.add("invalid");
    } else {
        password.classList.remove("invalid");
    }
})

confirmPassword.addEventListener("keyup", () => {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    confirmPassword.classList.remove("invalid");

    clearTimeout(timer);
    
    timer = setTimeout(() => {
        if (passwordValue != confirmPasswordValue) {
            isConfirmPasswordValid = false;
            confirmPassword.classList.add("invalid");
        } else {
            isConfirmPasswordValid = true;
            confirmPassword.classList.remove("invalid");
        }    
    }, 500);
})

confirmPassword.addEventListener("change", () => {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    
    if (passwordValue != confirmPasswordValue) {
        isConfirmPasswordValid = false;
        confirmPassword.classList.add("invalid");
    } else {
        isConfirmPasswordValid = true;
        confirmPassword.classList.remove("invalid");
    }    
})

signupWGoogle.addEventListener("click", (e) => e.preventDefault());

signupForm.addEventListener("submit", (e) => {    
    if (!isConfirmPasswordValid) {
        e.preventDefault();
    }
    window.location.replace('http://127.0.0.1:5500/Sign-up-Form/index.html'); 
})
