// Tras construir las cards (o cuando quieras volver a animarlas):
gsap.from(".electronica-card", {
    duration: 0.7,
    y: 25,
    opacity: 0,
    stagger: 0.15,
    ease: "power2.out"   // cambia por "elastic.out(1,0.5)" si quieres rebote
  });
  