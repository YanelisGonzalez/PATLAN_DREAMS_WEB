<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo anima una vez
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
  });
</script>
