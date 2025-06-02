/*
async function obtenerSaludo() {
    // Puedes personalizar este mensaje o cargarlo desde un servidor si lo deseas
    return "¡Bienvenido a nuestro sitio!";
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerSaludo().then(mensaje => {
        document.getElementById("mensaje").innerText = mensaje;
    });
});
*/
async function obtenerSaludo() {
  // Puedes personalizar este mensaje o cargarlo desde un servidor si lo deseas
  return "¡Bienvenido a nuestro sitio!";
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('alert');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      mensaje: form.mensaje.value.trim()
    };

    // Validación básica en cliente
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      showAlert('Por favor, completa todos los campos.', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/enviar_formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        showAlert('Mensaje enviado correctamente. ¡Gracias!', 'success');
        form.reset();
      } else {
        showAlert(result.detail || 'Error al enviar el mensaje.', 'error');
      }

    } catch (error) {
      console.error('Error de red:', error);
      showAlert('Error de conexión. Intenta nuevamente más tarde.', 'error');
    }
  });

  function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
  }
});
