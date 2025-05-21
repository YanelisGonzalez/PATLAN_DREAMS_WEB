async function obtenerSaludo() {
    // Puedes personalizar este mensaje o cargarlo desde un servidor si lo deseas
    return "¡Bienvenido a nuestro sitio!";
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerSaludo().then(mensaje => {
        document.getElementById("mensaje").innerText = mensaje;
    });
});
