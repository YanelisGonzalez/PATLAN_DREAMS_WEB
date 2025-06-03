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
  });


  
  