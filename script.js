let menuIcon = document.querySelector('#menu-icon');
let menuImg = document.querySelector('#menu-img');
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {

  if (navbar.classList.contains('active')) {
    menuImg.src = "assets/Icons/HamburgerMenu.png";
  } else {
    menuImg.src = "assets/Icons/X.png";
  }    
  
  navbar.classList.toggle('active');
}

// typewriter.js
document.addEventListener("DOMContentLoaded", () => {
  const words = ["Game Developer", "Software Engineer", "Tech Enthusiast"];
  const el = document.getElementById("typewriter");

  let i = 0;         // current word index
  let j = 0;         // current char count shown
  let deleting = false;

  // Tunables (tweak these to taste)
  const baseType = 85;          // avg ms per keystroke when typing
  const typeJitter = 120;       // random extra ms added (0..typeJitter)
  const deleteFactor = 0.45;    // deletion is faster (smaller is faster)
  const wordPause = 3000;       // pause after a word is finished
  const minDelay = 35;          // never go faster than this
  const microPauseChance = 0.08; // chance to pause briefly mid-word
  const microPauseMs = 160;     // extra pause when it happens

  function nextDelay(char, isDeleting) {
    // base random delay
    let d = baseType + Math.random() * typeJitter;
    // delete faster
    if (isDeleting) d *= deleteFactor;
    // punctuation pauses (when typing)
    if (!isDeleting && /[.,!?;:]/.test(char)) d += 220;
    // occasional human micro-pause mid-word
    if (!isDeleting && j > 0 && Math.random() < microPauseChance) d += microPauseMs;
    // clamp
    return Math.max(minDelay, Math.round(d));
  }

  function tick() {
    const word = words[i];

    if (!deleting) {
      // TYPE left→right
      el.textContent = word.slice(0, j++);
      if (j > word.length) {
        deleting = true;
        setTimeout(tick, wordPause);
        return;
      }
    } else {
      // DELETE from the end (reverse)
      j--;
      el.textContent = word.slice(0, j);
      if (j <= 0) {
        deleting = false;
        i = (i + 1) % words.length;
        j = 0;
      }
    }

    const nextChar = deleting ? word[Math.max(j - 1, 0)] : word[Math.min(j - 1, word.length - 1)];
    setTimeout(tick, nextDelay(nextChar || "", deleting));
  }

  tick();
});

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".code-accordion");

  accordions.forEach(accordion => {
    const header = accordion.querySelector(".code-accordion-header");
    const panel  = accordion.querySelector(".code-accordion-panel");

    header.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("open");

      // Close all accordions
      accordions.forEach(a => {
        a.classList.remove("open");
        const p = a.querySelector(".code-accordion-panel");
        p.style.maxHeight = 0;
      });

      // If this one was closed → open it
      if (!isOpen) {
        accordion.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});


document.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item, .project-details img");
  if (!item) return;

  const img = item.tagName === "IMG" ? item : item.querySelector("img");
  const video = item.querySelector("video");

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbVideo = document.getElementById("lightbox-video");

  // Hide both first
  lbImg.style.display = "none";
  lbVideo.style.display = "none";

  if (img) {
    lbImg.src = img.src;
    lbImg.style.display = "block";
  }

  if (video) {
    lbVideo.src = video.src;
    lbVideo.style.display = "block";
  }

  lightbox.classList.remove("hidden");
});

// Close on click or ESC
document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("lightbox").classList.add("hidden");
});

document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") {
    e.target.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("lightbox").classList.add("hidden");
  }
});
