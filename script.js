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
