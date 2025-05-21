const API_URL = "http://127.0.0.1:8000";

async function obtenerSaludo() {
    const res = await fetch(`${API_URL}/saludo`);
    const data = await res.json();
    return data.mensaje;
}

/*const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
let index = 0;
let direction = 1;

function moveSlide(step) {
  index = (index + step + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}
  */

let currentIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  let slideInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  function moveSlide(direction) {
    showSlide(currentIndex + direction);
    resetAutoSlide();
  }

  function autoSlide() {
    slideInterval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000); // cambia cada 5 segundos
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    autoSlide(); // reiniciar
  }

  // Iniciar auto-slide al cargar
  document.addEventListener("DOMContentLoaded", () => {
    autoSlide();
  });


