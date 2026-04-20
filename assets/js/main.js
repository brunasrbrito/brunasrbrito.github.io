(() => {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('mob-toggle');
  const overlay = document.getElementById('mob-overlay');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar__nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards = document.querySelectorAll('#proj-grid .proj-card');
  const blob1 = document.querySelector('.hero__blob--1');
  const blob2 = document.querySelector('.hero__blob--2');


  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);


  navLinks.forEach(link => link.addEventListener('click', closeSidebar));


  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
      toggle.focus();
    }
  });

  function setActiveNav(id) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
    });
  }

  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { threshold: 0.4 });

  sections.forEach(s => spyObserver.observe(s));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(s => revealObserver.observe(s));

  function filterProjects(filter) {
    projCards.forEach(card => {
      const match = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('is-hidden', !match);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filterProjects(btn.dataset.filter);
    });
  });

  let rafId = null;
  let mouseX = 0;
  let mouseY = 0;

  function applyParallax() {
    const x = (mouseX / window.innerWidth - 0.5) * 10;
    const y = (mouseY / window.innerHeight - 0.5) * 10;
    if (blob1) blob1.style.transform = `translate(${x}px, ${y}px)`;
    if (blob2) blob2.style.transform = `translate(${-x}px, ${-y}px)`;
    rafId = null;
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    });
  }

})();