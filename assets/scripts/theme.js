// Theme Toggle
const themeToggle = document.querySelector("#mode");
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
} else {
    localStorage.setItem("theme", "light");
}

function switchTheme() {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let selectedTheme = "dark";

    if (currentTheme === "dark") {
    selectedTheme = "light";
    }

    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
}

themeToggle.addEventListener("click", switchTheme);
themeToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        switchTheme();
        event.preventDefault();
    }
});

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  console.log(
    "If Once You Start Down The Dark Path, Forever Will It Dominate Your Destiny."
  );
} else {
  console.log("Luminous beings are we, not this crude matter.");
}
