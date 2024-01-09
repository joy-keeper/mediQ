const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const htmlEl = document.getElementsByTagName("html")[0];
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;
if (currentTheme) {
  htmlEl.dataset.theme = currentTheme;
}
const toggleTheme = (theme) => {
  htmlEl.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

function togglePasswordVisibility(toggleButton, targetInput) {
  const input = document.querySelector(targetInput);
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);
  toggleButton.classList.toggle("fa-eye-slash");
}

const toggleLoginPassword = document.querySelector("#toggleLoginPassword");
toggleLoginPassword.addEventListener("click", function (e) {
  togglePasswordVisibility(this, "#loginPasswordInput");
});

const togglePassword = document.querySelector("#togglePassword");
togglePassword.addEventListener("click", function (e) {
  togglePasswordVisibility(this, "#passwordInput");
});

const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
toggleConfirmPassword.addEventListener("click", function (e) {
  togglePasswordVisibility(this, "#confirmPasswordInput");
});