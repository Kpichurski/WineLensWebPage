document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initSmoothScrolling();
  initAnimations();
  initMobileMenu();
  initScrollEffects();
  initImageLoading();
  initButtonEffects();
  initCardEffects();
  initDownloadTracking();
});

function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault();
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".feature-card, .screenshot"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }
}

function initScrollEffects() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function initImageLoading() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });

    img.addEventListener("error", function () {
      this.style.display = "none";
      console.warn("Failed to load image:", this.src);
    });

    if (img.complete) {
      img.classList.add("loaded");
    }
  });
}

function initButtonEffects() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

function initCardEffects() {
  const cards = document.querySelectorAll(".feature-card, .screenshot");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

function trackEvent(eventName, eventData = {}) {
  console.log("Event tracked:", eventName, eventData);
}

function initDownloadTracking() {
  const downloadButtons = document.querySelectorAll(
    ".download-btn, .btn-primary"
  );
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      trackEvent("download_clicked", {
        button: this.textContent.trim(),
        section: this.closest("section")?.id || "unknown",
      });
    });
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const navMenu = document.querySelector(".nav-menu");
    const navToggle = document.querySelector(".nav-toggle");

    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  }
});

const additionalStyles = `
    .navbar.scrolled {
        background: linear-gradient(135deg, rgba(26, 8, 8, 0.98) 0%, rgba(74, 14, 26, 0.96) 50%, rgba(92, 14, 27, 0.94) 100%);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
