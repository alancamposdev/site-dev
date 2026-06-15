// ═══════════════════════════════════════════
//  main.js  –  Global JS
// ═══════════════════════════════════════════

/* ── DOM refs ── */
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');
const userDetails = document.getElementById('nav-user-details');

/* ══════════════════════════════
   Mobile drawer
   ══════════════════════════════ */
const openMenu = () => {
  navMenu?.classList.add('show-menu');
  navOverlay?.classList.add('visible');
  navClose?.classList.add('visible');
  navToggle?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  navMenu?.classList.remove('show-menu');
  navOverlay?.classList.remove('visible');
  navClose?.classList.remove('visible');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

navToggle?.addEventListener('click', () => {
  navMenu?.classList.contains('show-menu') ? closeMenu() : openMenu();
});

navClose?.addEventListener('click', closeMenu);
navOverlay?.addEventListener('click', closeMenu);

// Close when a nav link is tapped
navMenu?.querySelectorAll('.nav__item a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMenu();
    userDetails?.removeAttribute('open');
  }
});

/* ══════════════════════════════
   Header: add .scrolled class
   ══════════════════════════════ */
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);

  // Scroll progress indicator
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
  header.style.setProperty('--scroll-progress', `${pct}%`);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ══════════════════════════════
   User details: close on outside click
   ══════════════════════════════ */
document.addEventListener('click', e => {
  if (userDetails?.open && !userDetails.contains(e.target)) {
    userDetails.removeAttribute('open');
  }
});

/* ══════════════════════════════
   Active link highlighting
   ══════════════════════════════ */
const currentPath = window.location.pathname;
document.querySelectorAll('.nav__item a').forEach(link => {
  const linkPath = new URL(link.href, location.origin).pathname;
  if (linkPath === currentPath) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
