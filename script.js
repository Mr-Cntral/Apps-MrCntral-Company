const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  observer.observe(element);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});
