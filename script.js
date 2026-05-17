const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  observer.observe(item);
});

const orbit = document.querySelector('.system-orbit');
if (orbit) {
  orbit.addEventListener('pointermove', (event) => {
    const rect = orbit.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    orbit.style.setProperty('--rx', `${y}deg`);
    orbit.style.setProperty('--ry', `${x}deg`);
  });

  orbit.addEventListener('pointerleave', () => {
    orbit.style.setProperty('--rx', '0deg');
    orbit.style.setProperty('--ry', '0deg');
  });
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const node = entry.target;
    const target = Number(node.dataset.count);
    let current = 0;
    const steps = 36;
    const increment = target / steps;
    const tick = () => {
      current += increment;
      if (current >= target) {
        node.textContent = target.toString();
        return;
      }
      node.textContent = Math.round(current).toString();
      requestAnimationFrame(tick);
    };
    tick();
    counterObserver.unobserve(node);
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));
