/* ============================================================
   PLENNA TECNOLOGIA — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Sticky Header --- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* --- Mobile Nav Toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Fade-In on Scroll (IntersectionObserver) --- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach(el => observer.observe(el));
  }

  /* --- Animated Counters --- */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const isFloat  = el.dataset.float === 'true';
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            counterObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* --- Typewriter --- */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const words = [
      'Suporte Técnico',
      'ERP TOTVS',
      'Infraestrutura',
      'Power BI',
      'Desenvolvimento Web',
      'Helpdesk',
      'Inteligência Artificial',
    ];
    let wordIndex  = 0;
    let charIndex  = 0;
    let deleting   = false;
    const TYPE_SPEED   = 80;
    const DELETE_SPEED = 40;
    const PAUSE_AFTER  = 1800;
    const PAUSE_BEFORE = 300;

    function tick() {
      const word    = words[wordIndex];
      const current = deleting
        ? word.slice(0, charIndex - 1)
        : word.slice(0, charIndex + 1);

      typewriterEl.textContent = current;

      if (!deleting && current === word) {
        setTimeout(() => { deleting = true; tick(); }, PAUSE_AFTER);
        return;
      }

      if (deleting && current === '') {
        deleting   = false;
        wordIndex  = (wordIndex + 1) % words.length;
        charIndex  = 0;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }

      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
    }

    if (prefersReducedMotion) {
      typewriterEl.textContent = words[0];
    } else {
      tick();
    }
  }

  /* --- Dropdown Keyboard Accessibility --- */
  document.querySelectorAll('.nav-item').forEach(item => {
    const trigger = item.querySelector('.nav-link');
    if (!item.querySelector('.dropdown') || !trigger) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    item.addEventListener('focusin', () => {
      trigger.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('focusout', e => {
      if (!item.contains(e.relatedTarget)) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.activeElement.blur();
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* --- Interactive Services --- */
  const serviceItems  = document.querySelectorAll('.services-list-item');
  const servicePanels = document.querySelectorAll('.services-panel-item');
  const serviceImgs   = document.querySelectorAll('.services-img-item');

  function activateService(target) {
    serviceItems.forEach(i  => i.classList.remove('active'));
    servicePanels.forEach(p => p.classList.remove('active'));
    serviceImgs.forEach(img => img.classList.remove('active'));

    const item  = document.querySelector(`.services-list-item[data-service="${target}"]`);
    const panel = document.querySelector(`.services-panel-item[data-service="${target}"]`);
    const img   = document.querySelector(`.services-img-item[data-service="${target}"]`);

    if (item)  item.classList.add('active');
    if (panel) panel.classList.add('active');
    if (img)   img.classList.add('active');
  }

  serviceItems.forEach(item => {
    item.addEventListener('click', () => activateService(item.dataset.service));
  });

  /* --- Hero service links → activate correct panel --- */
  document.querySelectorAll('.hero-pill[data-service]').forEach(link => {
    link.addEventListener('click', () => activateService(link.dataset.service));
  });

  /* --- About slideshow --- */
  const aboutSlides = document.querySelectorAll('.about-slide');
  const aboutDots   = document.querySelectorAll('.about-dot');
  if (aboutSlides.length > 1) {
    let current = 0;

    function goToSlide(n) {
      aboutSlides[current].classList.remove('active');
      aboutDots[current].classList.remove('active');
      current = (n + aboutSlides.length) % aboutSlides.length;
      aboutSlides[current].classList.add('active');
      aboutDots[current].classList.add('active');
    }

    aboutDots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

    if (!prefersReducedMotion) {
      setInterval(() => goToSlide(current + 1), 3500);
    }
  }

  /* --- Active nav link --- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .dropdown a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#')) return;
    const normalized = href.replace('../', '/');
    if (currentPath.endsWith(normalized) || (normalized.length > 1 && currentPath.includes(normalized))) {
      link.classList.add('active');
      const parentItem = link.closest('.nav-item');
      if (parentItem && !link.classList.contains('nav-link')) {
        parentItem.querySelector('.nav-link')?.classList.add('active');
      }
    }
  });

});
