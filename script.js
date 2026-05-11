const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

themeToggle.addEventListener("click", () => {
  let theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark") {
    theme = "light";
    document.documentElement.removeAttribute("data-theme");
  } else {
    theme = "dark";
    document.documentElement.setAttribute("data-theme", "dark");
  }
  localStorage.setItem("theme", theme);
});

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});
document
  .querySelectorAll("a, button, .skill-pill, .project-card, .stat-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("expand"));
    el.addEventListener("mouseleave", () => ring.classList.remove("expand"));
  });

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        // Skill bars
        e.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);
revealEls.forEach((el) => observer.observe(el));

document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
  const parentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) bar.style.width = bar.dataset.width;
      });
    },
    { threshold: 0.3 },
  );
  parentObserver.observe(bar.closest(".skill-category"));
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--ink)" : "";
  });
});
