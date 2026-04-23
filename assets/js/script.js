// ===== NAV =====
const nav = document.getElementById("nav");

// ===== LOADER =====
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// ===== SCROLL NAV EFFECT =====
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== IMAGE MODAL =====
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

function openImg(el) {
  const img = el.querySelector("img");
  modalImg.src = img.src;
  modal.style.display = "flex";

  setTimeout(() => modal.classList.add("show"), 10);
}

function closeImg() {
  modal.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 200);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeImg();
});

// ===== SERVICE WORKER =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

// ===== PWA INSTALL =====
let deferredPrompt;

const installBox = document.getElementById("installBox");
const installBtn = document.getElementById("installBtn");
const closeBtn = document.getElementById("closeBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBox.style.display = "flex";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;
  installBox.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  installBox.style.display = "none";
});

window.addEventListener("appinstalled", () => {
  installBox.style.display = "none";
});

// ===== SERVICE CARDS ANIMATION (OPTIMIZED) =====
const cards = document.querySelectorAll(".service");

const revealOnScroll = () => {
  const trigger = window.innerHeight - 100;

  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;

    if (top < trigger) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});
