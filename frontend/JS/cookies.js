<script>
  // Función para obtener una cookie por nombre
  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Función para establecer una cookie (duración: 1 año)
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-consent-banner");
    const acceptBtn = document.getElementById("accept-cookies-btn");

    if (!banner || !acceptBtn) return;

    // Mostrar banner solo si no se ha aceptado
    if (!getCookie("cookiesAccepted")) {
      banner.style.display = "flex";
    }

    acceptBtn.addEventListener("click", function () {
      setCookie("cookiesAccepted", "true", 365); // guardar por 1 año
      banner.style.display = "none";
    });
  });
</script>
