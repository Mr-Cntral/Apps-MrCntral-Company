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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  observer.observe(item);
});

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

const canvas = document.createElement('canvas');
canvas.className = 'galaxy-canvas';
document.body.prepend(canvas);
const fade = document.createElement('div');
fade.className = 'galaxy-fade';
document.body.insertBefore(fade, document.body.children[1]);

const ctx = canvas.getContext('2d');
let width = 0;
let height = 0;
let particles = [];
let rafId;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeGalaxy() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = width < 520 ? 72 : 120;
  particles = Array.from({ length: count }, (_, index) => {
    const arm = index % 3;
    const radius = Math.random() * Math.max(width, height) * 0.42;
    const angle = Math.random() * Math.PI * 2 + arm * 2.1;
    return {
      baseRadius: radius,
      angle,
      speed: 0.00045 + Math.random() * 0.00075,
      size: 0.7 + Math.random() * 1.9,
      alpha: 0.25 + Math.random() * 0.65,
      drift: Math.random() * 40
    };
  });
}

function drawGalaxy(time = 0) {
  ctx.clearRect(0, 0, width, height);
  const cx = width * 0.52;
  const cy = height * 0.34;

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.75);
  gradient.addColorStop(0, 'rgba(46, 232, 199, 0.18)');
  gradient.addColorStop(0.34, 'rgba(79, 140, 255, 0.12)');
  gradient.addColorStop(1, 'rgba(7, 11, 24, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  particles.forEach((p) => {
    p.angle += p.speed;
    const pulse = Math.sin(time * 0.001 + p.drift) * 10;
    const x = cx + Math.cos(p.angle) * (p.baseRadius + pulse);
    const y = cy + Math.sin(p.angle) * (p.baseRadius * 0.48 + pulse * 0.35);
    ctx.beginPath();
    ctx.arc(x, y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(214, 244, 255, ${p.alpha})`;
    ctx.fill();
  });

  if (!prefersReducedMotion) rafId = requestAnimationFrame(drawGalaxy);
}

resizeGalaxy();
drawGalaxy();
window.addEventListener('resize', () => {
  cancelAnimationFrame(rafId);
  resizeGalaxy();
  drawGalaxy();
}, { passive: true });
