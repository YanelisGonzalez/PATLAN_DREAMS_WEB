<script>
  document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-consent-banner");
    const acceptBtn = document.getElementById("accept-cookies-btn");

    // Mostrar banner solo si no se ha aceptado antes
    if (!localStorage.getItem("cookiesAccepted")) {
      banner.style.display = "flex";
    }

    // Evento de clic en el botón
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true");
      banner.style.display = "none";
    });
  });
</script>
