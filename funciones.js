const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
  const menuLabel = menuButton.querySelector(".sr-only");

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    if (menuLabel) {
      menuLabel.textContent = "Abrir menú";
    }
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open", !isExpanded);
    if (menuLabel) {
      menuLabel.textContent = isExpanded ? "Abrir menú" : "Cerrar menú";
    }
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 681px)").matches) {
      closeMenu();
    }
  });
}

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealItems = document.querySelectorAll(
    ".problem, .product-showcase, .stage-card, .benefit-card, .application-card, .why, .evidence-card, .cta"
  );
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  document.documentElement.classList.add("reveal-ready");
  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
}