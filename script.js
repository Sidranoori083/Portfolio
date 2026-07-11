const body = document.body;
const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-link');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const loader = document.querySelector('.page-loader');
const year = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.skill-progress');
const backToTop = document.querySelector('.back-to-top');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

const words = ['Data Science Student', 'Frontend Developer', 'Python Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;

  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.slice(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = isDeleting ? 70 : 120;
  setTimeout(typeEffect, speed);
}

function handleScroll() {
  const scrolled = window.scrollY > 24;
  header?.classList.toggle('scrolled', scrolled);

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });

  backToTop.style.opacity = window.scrollY > 600 ? '1' : '0';
  backToTop.style.pointerEvents = window.scrollY > 600 ? 'auto' : 'none';
}

function revealOnScroll() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      item.classList.add('visible');
    }
  });
}

function animateSkillBars() {
  progressBars.forEach((bar) => {
    const width = bar.getAttribute('data-width');
    if (bar.dataset.animated === 'true') return;
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      bar.style.width = width;
      bar.dataset.animated = 'true';
    }
  });
}

function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  toggle?.classList.toggle('active', isOpen);
  toggle?.setAttribute('aria-expanded', String(isOpen));
}

function applyProjectFilter(filter) {
  projectCards.forEach((card) => {
    const category = card.dataset.category;
    const matches = filter === 'all' || category === filter;
    card.classList.toggle('is-hidden', !matches);
  });
}

function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

function closeMenu() {
  nav?.classList.remove('open');
  toggle?.classList.remove('active');
  toggle?.setAttribute('aria-expanded', 'false');
}

window.addEventListener('load', () => {
  loader?.classList.add('hidden');
  setTimeout(() => loader?.remove(), 600);
  typeEffect();
  revealOnScroll();
  animateSkillBars();
});

window.addEventListener('scroll', () => {
  handleScroll();
  revealOnScroll();
  animateSkillBars();
});

window.addEventListener('resize', closeMenu);

toggle?.addEventListener('click', toggleMenu);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    applyProjectFilter(button.dataset.filter);
  });
});

document.querySelectorAll('.btn, .filter-btn').forEach((element) => {
  element.addEventListener('click', createRipple);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

year.textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
}
