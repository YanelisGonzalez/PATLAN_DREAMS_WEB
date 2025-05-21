
/*document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    let current = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
          slide.classList.add("active");
        }
      });
    }
  
    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }
  
    // Mostrar el primer slide al iniciar
    showSlide(current);
  
    // Cambiar cada 4 segundos
    setInterval(nextSlide, 4000);
  });
  */
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  setInterval(nextSlide, 4000); // Cambia de imagen cada 4 segundos
  
  