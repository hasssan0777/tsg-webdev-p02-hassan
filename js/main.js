// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// Active link highlight while scrolling
const links = menu.querySelectorAll('a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

// Testimonials slider
const track = document.getElementById('track');
const dotsBox = document.getElementById('dots');
const total = track.children.length;
let index = 0;
for (let i = 0; i < total; i++) {
  const d = document.createElement('button');
  d.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
  d.addEventListener('click', () => show(i));
  dotsBox.appendChild(d);
}
function show(i) {
  index = (i + total) % total;
  track.style.transform = `translateX(-${index * 100}%)`;
  [...dotsBox.children].forEach((d, n) => d.classList.toggle('on', n === index));
}
document.getElementById('prev').addEventListener('click', () => show(index - 1));
document.getElementById('next').addEventListener('click', () => show(index + 1));
show(0);

// FAQ accordion (one open at a time)
document.querySelectorAll('.acc-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.acc-q').forEach(b => {
      b.setAttribute('aria-expanded', false);
      b.nextElementSibling.style.maxHeight = null;
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', true);
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Contact form (front-end validation only)
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const status = document.getElementById('status');
  const f = e.target;
  if (!f.name.value.trim() || !f.email.checkValidity() || !f.msg.value.trim()) {
    status.textContent = 'Please fill in your name, a valid email and a message.';
    return;
  }
  status.textContent = 'Thanks ' + f.name.value.trim() + ', we will reply within one day.';
  f.reset();
});
