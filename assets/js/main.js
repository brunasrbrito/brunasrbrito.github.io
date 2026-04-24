
(() => {
  "use strict";

  /* -- Elementos -- */
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("mob-toggle");
  const overlay = document.getElementById("mob-overlay");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".sidebar-nav-link");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projCols = document.querySelectorAll("#proj-grid [data-type]");
  const blob1 = document.querySelector(".home-blob--1");
  const blob2 = document.querySelector(".home-blob--2");

  /* -- Bootstrap: Tooltips -- */
  document
    .querySelectorAll("[data-bs-toggle='tooltip']")
    .forEach((el) => {
      new bootstrap.Tooltip(el, { trigger: "hover focus" });
    });

  /* -- Sidebar -- */
  function openSidebar() {
    sidebar.classList.add("is-open");
    overlay.classList.add("is-visible");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", () =>
    sidebar.classList.contains("is-open")
      ? closeSidebar()
      : openSidebar(),
  );

  overlay.addEventListener("click", closeSidebar);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveNav(link.getAttribute("href").replace("#", ""));
      closeSidebar();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("is-open")) {
      closeSidebar();
      toggle.focus();
    }
  });

  /* -- Nav ativa -- */
  function setActiveNav(id) {
    navLinks.forEach((link) =>
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${id}`,
      ),
    );
  }

  /* -- IntersectionObserver: nav spy -- */
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveNav(e.target.id);
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
  );

  sections.forEach((s) => spyObserver.observe(s));

  /* -- IntersectionObserver: reveal -- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  sections.forEach((s) => revealObserver.observe(s));

  /* -- Filtro de projetos (opera nas colunas Bootstrap) -- */
  function filterProjects(filter) {
    projCols.forEach((col) => {
      const match = filter === "all" || col.dataset.type === filter;
      col.classList.toggle("is-hidden", !match);

      // animação suave ao revelar
      if (match) {
        col.style.animation = "none";
        requestAnimationFrame(() => {
          col.style.animation = "";
        });
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      filterProjects(btn.dataset.filter);
    });
  });

  /* -- Parallax blobs -- */
  let rafId = null,
    mouseX = 0,
    mouseY = 0;

  function applyParallax() {
    const x = (mouseX / window.innerWidth - 0.5) * 10;
    const y = (mouseY / window.innerHeight - 0.5) * 10;
    if (blob1) blob1.style.transform = `translate(${x}px, ${y}px)`;
    if (blob2) blob2.style.transform = `translate(${-x}px, ${-y}px)`;
    rafId = null;
  }

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    });
  }
})();