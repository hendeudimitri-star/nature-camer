/* ─── HERO CAROUSEL ─── */
const slides = document.querySelectorAll('.hero-slide');
const indicatorsContainer = document.getElementById('heroIndicators');
let currentSlide = 0;
let heroTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Slide ' + (i + 1));
  dot.onclick = () => goToSlide(i);
  indicatorsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.hero-dot')[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.hero-dot')[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }

heroTimer = setInterval(nextSlide, 5500);

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── MOBILE MENU ─── */
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ─── REVEAL ON SCROLL ─── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ─── LANGUAGE TOGGLE ─── */
let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');

  document.querySelectorAll('[data-fr]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (el.innerHTML.includes('<em>') || el.innerHTML.includes('←') || el.innerHTML.includes('→')) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  document.querySelectorAll('select option[data-fr]').forEach(opt => {
    opt.textContent = opt.getAttribute('data-' + lang) || opt.textContent;
  });
}

/* ─── TÉMOIGNAGES ─── */
const temoItems = document.querySelectorAll('.temoignage-item');
let currentTemo = 0;

function temoNav(dir) {
  temoItems[currentTemo].classList.remove('active');
  currentTemo = (currentTemo + dir + temoItems.length) % temoItems.length;
  temoItems[currentTemo].classList.add('active');
}

/* ─── LIGHTBOX ─── */
function openLightbox(card) {
  const img = card.querySelector('img');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});

/* ─── FORM SUBMIT ─── */
function submitForm(btn) {
  const orig = btn.textContent;
  btn.textContent = currentLang === 'fr' ? '✓ Message envoyé !' : '✓ Message sent!';
  btn.style.background = 'var(--forest)';
  btn.style.color = 'var(--cream)';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.color = '';
  }, 3500);
}

/* ─── SMOOTH SCROLL NAV ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});