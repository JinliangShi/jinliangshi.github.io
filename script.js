const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".language-toggle");
const savedTheme = localStorage.getItem("theme");
const savedLanguage = localStorage.getItem("language") || "en";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme || prefersDark) {
  root.dataset.theme = savedTheme || "dark";
}

function setLanguage(language) {
  root.dataset.lang = language;
  root.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = element.dataset[language];
  });
  if (languageToggle) {
    languageToggle.textContent = language === "zh" ? "EN" : "中文";
    languageToggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
  }
  localStorage.setItem("language", language);
}

setLanguage(savedLanguage);

toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

languageToggle?.addEventListener("click", () => {
  setLanguage(root.dataset.lang === "zh" ? "en" : "zh");
});

document.getElementById("year").textContent = new Date().getFullYear();
