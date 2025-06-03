/*document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    let index = 0;
  
    function moveToNextSlide() {
      index++;
      if (index >= slides.length) {
        index = 0;
      }
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  
    setInterval(moveToNextSlide, 4000); // Cambia cada 4 segundos
  });
 */
  
  
  /*
  document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let autoSlideInterval;
  
    const updateSlidePosition = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
  
    const showNextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    };
  
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(showNextSlide, 4000); // cada 4 segundos
    };
  
    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };
  
    // Iniciar automáticamente
    startAutoSlide();
  
    const carousel = document.querySelector(".carousel");
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  
    // Accesibilidad para dropdown
    const dropdown = document.querySelector(".dropdown");
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    const dropdownToggle = dropdown.querySelector("a");
  
    dropdownToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dropdownContent.style.display =
          dropdownContent.style.display === "block" ? "none" : "block";
      }
    });
  
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdownContent.style.display = "none";
      }
    });
  });

   // Menú hamburguesa
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('main-nav');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      toggleBtn.classList.toggle('open');
    });
  }

  // Submenús desplegables
  const submenuToggles = document.querySelectorAll('.submenu-toggle');

  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;

      if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('open');

        // Opcional: cerrar los demás submenús
        submenuToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            const otherSubmenu = otherToggle.nextElementSibling;
            if (otherSubmenu && otherSubmenu.classList.contains('submenu')) {
              otherSubmenu.classList.remove('open');
            }
          }
        });
      }
    });
  });*/

  document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let autoSlideInterval;

  const updateSlidePosition = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  const showNextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(showNextSlide, 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Auto slide
  startAutoSlide();

  const carousel = document.querySelector(".carousel");

  // Soporte para desktop y móvil
  ["mouseenter", "touchstart"].forEach(evt =>
    carousel.addEventListener(evt, stopAutoSlide)
  );
  ["mouseleave", "touchend"].forEach(evt =>
    carousel.addEventListener(evt, startAutoSlide)
  );

  // Soporte táctil (deslizar con el dedo)
  let startX = 0;
  let endX = 0;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      } else {
        currentIndex = (currentIndex + 1) % slides.length;
      }
      updateSlidePosition();
    }
  });

  // Accesibilidad para dropdown
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    const dropdownToggle = dropdown.querySelector("a");

    dropdownToggle.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dropdownContent.style.display =
          dropdownContent.style.display === "block" ? "none" : "block";
      }
    });

    document.addEventListener("click", e => {
      if (!dropdown.contains(e.target)) {
        dropdownContent.style.display = "none";
      }
    });
  }

  // Menú hamburguesa
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("main-nav");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      toggleBtn.classList.toggle("open");
    });
  }

  // Submenús desplegables
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;

      if (submenu && submenu.classList.contains("submenu")) {
        submenu.classList.toggle("open");

        // Cerrar otros submenús
        submenuToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            const otherSubmenu = otherToggle.nextElementSibling;
            if (otherSubmenu && otherSubmenu.classList.contains("submenu")) {
              otherSubmenu.classList.remove("open");
            }
          }
        });
      }
    });
  });
});



  
  