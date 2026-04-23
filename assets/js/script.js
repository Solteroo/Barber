const nav=document.getElementById("nav");  
const modal=document.getElementById("imgModal");  
const modalImg=document.getElementById("modalImg");  
  
window.addEventListener("load",()=>{  
document.getElementById("loader").style.display="none";  
});  
  let deferredPrompt;

const installBox = document.getElementById("installBox");
const installBtn = document.getElementById("installBtn");
const closeBtn = document.getElementById("closeBtn");

// install prompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  installBox.style.display = "flex";
});

// install bosildi
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const choice = await deferredPrompt.userChoice;

  deferredPrompt = null;
  installBox.style.display = "none";
});

// X bosildi (yopish)
closeBtn.addEventListener("click", () => {
  installBox.style.display = "none";
});

// agar allaqachon install bo‘lsa
window.addEventListener("appinstalled", () => {
  installBox.style.display = "none";
});
window.addEventListener("scroll",()=>{  
nav.classList.toggle("scrolled",window.scrollY>50);  
});  
  
function openImg(el){  
const img=el.querySelector("img");  
modalImg.src=img.src;  
modal.style.display="flex";  
setTimeout(()=>modal.classList.add("show"),10);  
}  
  
function closeImg(){  
modal.classList.remove("show");  
setTimeout(()=>modal.style.display="none",200);  
}  
  
document.addEventListener("keydown",(e)=>{  
if(e.key==="Escape")closeImg();  
});  
  // PWA REGISTER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

// INSTALL LOGIC
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.style.display = "none";
  }
});

window.addEventListener("appinstalled", () => {
  installBtn.style.display = "none";
});
const cards = document.querySelectorAll(".service");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// menu bosilganda yopilsin (mobile UX)
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});
