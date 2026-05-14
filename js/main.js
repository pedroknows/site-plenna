/* ============================================================
   PLENNA TECNOLOGIA — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let trackingDebug = new URLSearchParams(window.location.search).has('debugTracking');
  try {
    trackingDebug = trackingDebug || window.localStorage?.getItem('plennaTrackingDebug') === 'true';
  } catch (_) {}

  window.dataLayer = window.dataLayer || [];

  function getText(el) {
    return (el?.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function getSectionId(el) {
    const section = el?.closest?.('section[id], header, footer');
    if (!section) return 'unknown';
    if (section.id) return section.id;
    return section.tagName.toLowerCase();
  }

  function trackEvent(eventName, payload = {}) {
    const eventPayload = {
      event: eventName,
      page_path: window.location.pathname,
      page_title: document.title,
      ...payload,
    };

    window.dataLayer.push(eventPayload);

    if (typeof window.gtag === 'function') {
      const { event, ...gtagPayload } = eventPayload;
      window.gtag('event', event, gtagPayload);
    }

    if (trackingDebug) {
      console.info('[Plenna tracking]', eventName, eventPayload);
    }
  }

  function upsertHiddenField(form, name, value) {
    if (!form || value == null || value === '') return;
    let field = form.querySelector(`input[type="hidden"][name="${name}"]`);
    if (!field) {
      field = document.createElement('input');
      field.type = 'hidden';
      field.name = name;
      form.appendChild(field);
    }
    field.value = value;
  }

  trackEvent('pln_page_view');

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
      'Desenvolvimento & APIs',
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
    item.addEventListener('click', () => {
      activateService(item.dataset.service);
      trackEvent('pln_service_select', {
        service: item.dataset.service,
        source: 'services_list',
        section: getSectionId(item),
      });
    });
  });

  /* --- Hero service links → activate correct panel --- */
  document.querySelectorAll('.hero-pill[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      activateService(link.dataset.service);
      trackEvent('pln_service_select', {
        service: link.dataset.service,
        source: 'hero_pill',
        cta_text: getText(link),
        section: getSectionId(link),
      });
    });
  });

  document.querySelectorAll('[data-jump-service]').forEach(link => {
    link.addEventListener('click', () => {
      activateService(link.dataset.jumpService);
      trackEvent('pln_service_select', {
        service: link.dataset.jumpService,
        source: 'jump_service',
        cta_text: getText(link),
        section: getSectionId(link),
      });
    });
  });

  /* --- Contact form prefill from CTAs --- */
  const contactService = document.getElementById('contact-service');
  const contactMessage = document.getElementById('contact-message');
  const contactContext = document.getElementById('contact-context');
  const defaultContactPrompt = 'Descreva brevemente o que você precisa, os sistemas envolvidos e a urgência.';
  const contactPrompts = {
    'Diagnóstico de TI': 'Conte qual gargalo mais impacta a operação hoje: ERP, rede, dados, integrações ou suporte.',
    'ERP TOTVS': 'Conte qual módulo TOTVS está travando e se o problema envolve parametrização, customização ou integração.',
    'Desenvolvimento & APIs': 'Conte quais sistemas precisam conversar e se a necessidade envolve API, job, portal ou automação.',
    'Infraestrutura de Redes': 'Descreva o ambiente atual: servidores, firewall, VPN, backups e pontos de instabilidade percebidos.',
    'Power BI & Analytics': 'Informe quais indicadores você precisa acompanhar e quais fontes de dados existem hoje.',
    'Helpdesk & Suporte': 'Conte o volume de chamados, principais recorrências e se precisa de suporte remoto, presencial ou ambos.',
    'Inteligência Artificial': 'Descreva onde a IA poderia ajudar: atendimento, análise de dados, automação ou produtividade interna.',
    'Outro': defaultContactPrompt,
  };

  function setContactPrompt(service, customPrompt) {
    const prompt = customPrompt || contactPrompts[service] || defaultContactPrompt;
    if (contactMessage) contactMessage.placeholder = prompt;
    if (contactContext) contactContext.textContent = prompt;
  }

  if (contactService) {
    contactService.addEventListener('change', () => setContactPrompt(contactService.value));
  }

  document.querySelectorAll('[data-form-service]').forEach(link => {
    link.addEventListener('click', () => {
      const service = link.dataset.formService;
      trackEvent('pln_cta_click', {
        service,
        cta_text: getText(link),
        section: getSectionId(link),
        target: link.getAttribute('href') || '',
      });

      if (contactService && service) {
        contactService.value = service;
        contactService.classList.add('form-highlight');
        setTimeout(() => contactService.classList.remove('form-highlight'), 1600);
      }

      setContactPrompt(service, link.dataset.formPrompt);

      if (contactMessage) {
        contactMessage.classList.add('form-highlight');
        setTimeout(() => contactMessage.classList.remove('form-highlight'), 1600);
        setTimeout(() => contactMessage.focus({ preventScroll: true }), 450);
      }
    });
  });

  /* --- Interactive Diagnostic --- */
  const diagnosticOptions = document.querySelectorAll('.diagnostic-option');
  const diagnosticPanels  = document.querySelectorAll('.diagnostic-panel');
  if (diagnosticOptions.length && diagnosticPanels.length) {
    function activateDiagnostic(target) {
      diagnosticOptions.forEach(option => {
        const active = option.dataset.diagnostic === target;
        option.classList.toggle('active', active);
        option.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      diagnosticPanels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.diagnosticPanel === target);
      });
    }

    diagnosticOptions.forEach(option => {
      option.addEventListener('click', () => {
        activateDiagnostic(option.dataset.diagnostic);
        trackEvent('pln_diagnostic_select', {
          diagnostic: option.dataset.diagnostic,
          source: 'diagnostic_option',
          cta_text: getText(option),
          section: getSectionId(option),
        });
      });
    });

    document.querySelectorAll('[data-diagnostic-target]').forEach(link => {
      link.addEventListener('click', () => {
        activateDiagnostic(link.dataset.diagnosticTarget);
        trackEvent('pln_diagnostic_select', {
          diagnostic: link.dataset.diagnosticTarget,
          source: 'pain_card',
          cta_text: getText(link),
          section: getSectionId(link),
        });
      });
    });
  }

  /* --- Conversion tracking --- */
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('pln_whatsapp_click', {
        cta_text: getText(link),
        section: getSectionId(link),
        link_url: link.href,
      });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('pln_email_click', {
        cta_text: getText(link),
        section: getSectionId(link),
        link_url: link.href,
      });
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('pln_phone_click', {
        cta_text: getText(link),
        section: getSectionId(link),
        link_url: link.href,
      });
    });
  });

  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', () => {
      const params = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(name => {
        upsertHiddenField(form, name, params.get(name));
      });

      upsertHiddenField(form, 'pagina_origem', window.location.href);
      upsertHiddenField(form, 'titulo_pagina', document.title);
      upsertHiddenField(form, 'referrer', document.referrer);

      const service = form.querySelector('[name="servico"]')?.value || '';
      trackEvent('pln_form_submit', {
        form_name: 'contact_form',
        service,
        section: getSectionId(form),
      });
    });
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
