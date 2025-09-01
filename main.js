// Mobil menü
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('navMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });
}

// Yukarı çık
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  toTop.hidden = window.scrollY <= 500;
});
if (toTop) toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Yıl
const yilSpan = document.getElementById('yil');
if (yilSpan) yilSpan.textContent = new Date().getFullYear();

// Hesap Yap (şimdilik pasif)
const hesap = document.getElementById('hesapLink');
if (hesap) {
  hesap.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Hesap Yap bölümü yakında aktif olacaktır.');
  });
}

// HERO Slider: yazılar slaytla değişsin
(function heroSlider(){
  const slides = Array.from(document.querySelectorAll('.hero .slide'));
  const dots = Array.from(document.querySelectorAll('.hero .dot'));
  const prev = document.querySelector('.hero .prev');
  const next = document.querySelector('.hero .next');
  const titleEl = document.getElementById('heroTitle');
  const descEl = document.getElementById('heroDesc');
  if (!slides.length) return;

  let i = 0, timer;
  const applyText = (idx) => {
    const s = slides[idx];
    if (s && titleEl && descEl) {
      titleEl.innerHTML = s.getAttribute('data-title') || titleEl.innerHTML;
      descEl.textContent = s.getAttribute('data-desc') || descEl.textContent;
    }
  };
  const show = (idx) => {
    slides.forEach((s, j) => s.classList.toggle('active', j === idx));
    dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    i = idx;
    applyText(idx);
  };
  const step = (dir=1) => show((i + dir + slides.length) % slides.length);
  const autoplay = () => { clearInterval(timer); timer = setInterval(() => step(1), 5000); };

  dots.forEach((d) => d.addEventListener('click', () => { show(+d.dataset.index); autoplay(); }));
  if (prev) prev.addEventListener('click', () => { step(-1); autoplay(); });
  if (next) next.addEventListener('click', () => { step(1); autoplay(); });

  show(0); autoplay();
})();
