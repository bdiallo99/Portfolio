// Mobile nav toggle
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a link (mobile)
document.querySelectorAll(".nav-link").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Active link while scrolling
const sections = [...document.querySelectorAll("section[id]")];
const links = [...document.querySelectorAll(".nav-link")];

const setActive = () => {
  const y = window.scrollY + 120;
  let currentId = "home";
  for (const s of sections) {
    if (s.offsetTop <= y) currentId = s.id;
  }
  links.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === "#" + currentId);
  });
};
window.addEventListener("scroll", setActive, { passive: true });
setActive();

// Projects filter + search
const projectGrid = document.getElementById("projectGrid");
const projectCards = [...document.querySelectorAll("#projectGrid .card")];
const pills = [...document.querySelectorAll(".pill")];
const search = document.getElementById("projectSearch");

let activeFilter = "all";
let query = "";

function matches(card) {
  const tags = (card.dataset.tags || "").split(" ");
  const text = (card.innerText || "").toLowerCase();

  const okFilter = activeFilter === "all" || tags.includes(activeFilter);
  const okQuery = !query || text.includes(query);
  return okFilter && okQuery;
}

function renderProjects() {
  projectCards.forEach((card) => {
    card.style.display = matches(card) ? "" : "none";
  });
}

pills.forEach((btn) => {
  btn.addEventListener("click", () => {
    pills.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter || "all";
    renderProjects();
  });
});

search?.addEventListener("input", (e) => {
  query = (e.target.value || "").trim().toLowerCase();
  renderProjects();
});

// Contact form (demo)
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (!name || !email || !message) return;

  // Simple "mailto:" fallback (no backend)
  const subject = encodeURIComponent("Contact portfolio — " + name);
  const body = encodeURIComponent(message + "\n\n—\n" + name + " (" + email + ")");
  window.location.href = `mailto:boubacargenieinfo99@gmail.com?subject=${subject}&body=${body}`;

  note.textContent = "Ouverture de votre application mail…";
});

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// ====== Carrousel Recommandations ======
(function () {
  const track   = document.getElementById("recoTrack");
  const prev    = document.getElementById("recoPrev");
  const next    = document.getElementById("recoNext");
  const dots    = [...document.querySelectorAll(".reco-dot")];
  const embeds  = [...document.querySelectorAll(".reco-embed")];
  const numEl   = document.getElementById("recoCurrentNum");
  const total   = dots.length;
  let current   = 0;

  function loadEmbed(index) {
    const iframe = embeds[index];
    if (iframe && !iframe.src && iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
    }
  }

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    prev.disabled = current === 0;
    next.disabled = current === total - 1;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
    if (numEl) numEl.textContent = current + 1;
    loadEmbed(current);
  }

  prev?.addEventListener("click", () => goTo(Math.max(0, current - 1)));
  next?.addEventListener("click", () => goTo(Math.min(total - 1, current + 1)));
  dots.forEach((dot) => dot.addEventListener("click", () => goTo(Number(dot.dataset.index))));

  const viewport = document.getElementById("recoViewport");
  let startX = 0;
  viewport?.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  viewport?.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40)
      goTo(diff > 0 ? Math.min(total - 1, current + 1) : Math.max(0, current - 1));
  });

  goTo(0); // charge uniquement le 1er PDF au démarrage
})();