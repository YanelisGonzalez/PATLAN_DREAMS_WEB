// Observador para detectar cuando los elementos entran en pantalla
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Si no quieres que se repita al hacer scroll, deja de observar
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
  });
  
  // Aplica el observador a todos los elementos con la clase 'animar'
  document.querySelectorAll('.animar').forEach(el => observer.observe(el));
  