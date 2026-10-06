const savedTheme = localStorage.getItem("naloges-theme");
const initialTheme = savedTheme === "light" ? "light" : "dark";
document.documentElement.dataset.theme = initialTheme;

const themeToggle = document.querySelector("#themeToggle");
const syncThemeButton = () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  themeToggle.textContent = `Modo ${nextTheme === "light" ? "claro" : "escuro"}`;
  themeToggle.setAttribute("aria-label", `Ativar modo ${nextTheme === "light" ? "claro" : "escuro"}`);
};
syncThemeButton();
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("naloges-theme", nextTheme);
  syncThemeButton();
});
