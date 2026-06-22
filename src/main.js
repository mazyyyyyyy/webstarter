// ── Category filter tabs ──
const tabs = document.querySelectorAll('.filter-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('filter-tab--active');
      t.classList.add('filter-tab--outline');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('filter-tab--active');
    tab.classList.remove('filter-tab--outline');
    tab.setAttribute('aria-selected', 'true');
  });
});

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Floating nav on scroll ──
const nav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');
const threshold = () => (header ? Math.max(0, header.offsetHeight - 10) : 120);

let isFloating = false;
const setFloating = (next) => {
  if (!nav || next === isFloating) return;
  isFloating = next;

  if (next) {
    nav.classList.add('is-entering');
    nav.classList.add('is-floating');
    requestAnimationFrame(() => nav.classList.remove('is-entering'));
  } else {
    nav.classList.remove('is-floating');
    nav.classList.remove('is-entering');
  }
};

const onScroll = () => setFloating(window.scrollY > threshold());
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();
