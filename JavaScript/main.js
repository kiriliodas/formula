// Script principal pour le site Formula 1

document.addEventListener("DOMContentLoaded", function () {
  // Gestion du menu mobile
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector("nav ul");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Animation au défilement
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.8) {
        element.classList.add("visible");
      }
    });
  }

  // Vérifier les éléments visibles au chargement initial
  checkScroll();

  // Vérifier les éléments visibles lors du défilement
  window.addEventListener("scroll", checkScroll);

  // Gestion des onglets dans la section classements
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        // Retirer la classe active de tous les boutons et contenus
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        // Ajouter la classe active au bouton cliqué et au contenu correspondant
        btn.classList.add("active");
        if (tabContents[index]) {
          tabContents[index].classList.add("active");
        }
      });
    });
  }

  // Gestion des filtres du calendrier
  const filterBtns = document.querySelectorAll(".filter-btn");
  const raceCards = document.querySelectorAll(".race-card");

  if (filterBtns.length > 0 && raceCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Retirer la classe active de tous les boutons
        filterBtns.forEach((b) => b.classList.remove("active"));

        // Ajouter la classe active au bouton cliqué
        btn.classList.add("active");

        // Filtrer les courses en fonction du filtre sélectionné
        const filter = btn.getAttribute("data-filter");

        if (filter === "all") {
          raceCards.forEach((card) => {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          });
        } else {
          raceCards.forEach((card) => {
            if (card.classList.contains(filter)) {
              card.style.display = "block";
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, 50);
            } else {
              card.style.opacity = "0";
              card.style.transform = "translateY(20px)";
              setTimeout(() => {
                card.style.display = "none";
              }, 300);
            }
          });
        }
      });
    });

    // Appliquer le style initial pour l'animation
    raceCards.forEach((card) => {
      card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    });
  }

  // Effet de parallaxe pour les sections avec fond
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    // Effet de parallaxe pour la section hero
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    }

    // Effet de parallaxe pour les autres sections avec fond
    const sectionsWithBg = document.querySelectorAll(
      ".teams-section, .calendar-section, .standings-section, .news-section"
    );
    sectionsWithBg.forEach((section) => {
      const sectionTop = section.offsetTop;
      const offset = (scrollPosition - sectionTop) * 0.2;
      if (section.querySelector(":before")) {
        section.querySelector(
          ":before"
        ).style.transform = `translateY(${offset}px)`;
      }
    });
  });

  // Amélioration des animations au survol pour les éléments de galerie
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)";
        this.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px var(--glow-color)";
        this.querySelector("img").style.transform = "scale(1.05)";
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
        this.querySelector("img").style.transform = "scale(1)";
      });
    });
  }

  // Animation de défilement fluide pour les liens d'ancrage
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Fermer le menu mobile si ouvert
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });

  // Effet de lueur (glow) pour les éléments avec la classe glow-effect
  const glowElements = document.querySelectorAll(".glow-effect");

  glowElements.forEach((element) => {
    element.addEventListener("mouseover", function () {
      this.style.filter = "drop-shadow(0 0 15px var(--glow-color))";
    });

    element.addEventListener("mouseout", function () {
      this.style.filter = "drop-shadow(0 0 5px var(--glow-color))";
    });
  });

  // Animation pour les cartes d'équipes et de pilotes
  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.querySelectorAll(".driver").forEach((driver, index) => {
        driver.style.transitionDelay = index * 0.1 + "s";
        driver.style.transform = "translateX(10px)";
      });
    });

    card.addEventListener("mouseleave", function () {
      this.querySelectorAll(".driver").forEach((driver) => {
        driver.style.transitionDelay = "0s";
        driver.style.transform = "translateX(0)";
      });
    });
  });

  // Ajout de la classe active au lien de navigation correspondant à la section visible
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const headerHeight = document.querySelector("header").offsetHeight;

      if (
        window.pageYOffset >= sectionTop - headerHeight - 100 &&
        window.pageYOffset < sectionTop + sectionHeight - headerHeight - 100
      ) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink);
  window.addEventListener("load", setActiveNavLink);
});
