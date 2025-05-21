// JavaScript para mover el carrusel de imágenes
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function moveSlide(step) {
    currentSlide += step;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0; // Vuelve al inicio si llega al final
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Vuelve al final si se mueve atrás
    }

    // Mover el carrusel a la nueva posición
    document.getElementById('carouselTrack').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Carrusel automático
setInterval(() => {
    moveSlide(1);
}, 5000); // Cambiar de imagen cada 5 segundos

// Interactividad con el mouse para pausar el carrusel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoMove); // Detener el carrusel automático cuando el mouse entra
});

carousel.addEventListener('mouseleave', () => {
    autoMove = setInterval(() => {
        moveSlide(1);
    }, 5000); // Reanudar el carrusel automático al salir el mouse
});
