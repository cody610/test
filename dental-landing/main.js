'use strict';

// Mobile nav toggle
const burger = document.querySelector('.nav__burger');
const mobileNav = document.getElementById('nav-mobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    burger.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-item__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    // Close all others
    document.querySelectorAll('.faq-item__question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherId = other.getAttribute('aria-controls');
        const otherAnswer = document.getElementById(otherId);
        if (otherAnswer) otherAnswer.hidden = true;
      }
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    if (answer) answer.hidden = expanded;
  });
});

// Scroll fade-in
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll(
    '.benefit-card, .process-step, .testimonial-card, .pricing-card, .faq-item, .compare-card'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

// Form submit (demo handler)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Request Received! We\'ll call you within 1 hour.';
    btn.disabled = true;
    btn.style.background = 'var(--color-accent)';
  });
}

// Sticky nav shadow on scroll
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(8,145,178,.12)'
      : 'none';
  }, { passive: true });
}
