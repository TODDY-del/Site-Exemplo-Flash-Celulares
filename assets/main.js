/* Header scroll */
const header = document.getElementById('header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* FAB */
const fab = document.getElementById('fab');
if (fab) {
  window.addEventListener('scroll', () => fab.classList.toggle('visible', window.scrollY > 300), { passive: true });
}

/* Hamburger */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
function closeNav() {
  if (!hamburger || !mobileNav) return;
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.style.display = 'none';
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      mobileNav.style.display = 'flex';
      requestAnimationFrame(() => mobileNav.classList.add('open'));
      document.body.style.overflow = 'hidden';
    } else {
      closeNav();
    }
  });
}

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
}

/* FAQ accordion */
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* Blog filter */
document.querySelectorAll('.blog-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.blog-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.blog-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});
