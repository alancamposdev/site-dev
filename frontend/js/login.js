const form = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const themeToggle = document.getElementById("themeToggle");



function applyTheme(theme, save = false) {
  document.documentElement.setAttribute("data-theme", theme);

  if (save) {
    localStorage.setItem("theme", theme);
  }
}

const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme || document.documentElement.getAttribute("data-theme") || "light";
applyTheme(initialTheme);

function validateEmail() {
  if (email.value.trim() === "") {
    emailError.textContent = "O e-mail é obrigatório.";
    return false;
  }

  if (!email.validity.valid) {
    emailError.textContent = "Digite um e-mail válido.";
    return false;
  }

  emailError.textContent = "";
  return true;
}

function validatePassword() {
  if (password.value.trim() === "") {
    passwordError.textContent = "A senha é obrigatória.";
    return false;
  }

  if (password.value.length < 8) {
    passwordError.textContent =
      "A senha deve ter pelo menos 8 caracteres.";
    return false;
  }

  passwordError.textContent = "";
  return true;
}

function updateButton() {
  const valid = validateEmail() && validatePassword();

  submitBtn.disabled = !valid;
}

email.addEventListener("input", updateButton);
password.addEventListener("input", updateButton);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("Login validado com sucesso!");
});

themeToggle.addEventListener("click", () => {

  themeToggle.classList.add("rotate");

  setTimeout(() => {
    themeToggle.classList.remove("rotate");
  }, 400);

  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  const newTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  applyTheme(newTheme, true);
});

