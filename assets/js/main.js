const toggle = document.getElementById("mob-toggle");
const sidebar = document.getElementById("sidebar");
toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(
          `nav a[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.3 },
);
sections.forEach((s) => observer.observe(s));

const filterBtns = document.querySelectorAll(".filter-btn");
const projCards = document.querySelectorAll("#proj-grid .proj-card");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projCards.forEach((card) => {
      const match = filter === "all" || card.dataset.type === filter;
      card.style.display = match ? "" : "none";
    });
  });
});


navLinks.forEach((link) => {
  link.addEventListener("click", () => sidebar.classList.remove("open"));
});