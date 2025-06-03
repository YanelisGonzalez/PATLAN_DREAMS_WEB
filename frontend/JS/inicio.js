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
  return "¡Bienvenido a nuestro sitio!";
}

document.addEventListener('DOMContentLoaded', () => {
  // Formulario de contacto
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('alert');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = {
        nombre: form.nombre.value.trim(),
        email: form.email.value.trim(),
        mensaje: form.mensaje.value.trim()
      };

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
  }

  // Menú hamburguesa
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('main-nav');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      toggleBtn.classList.toggle('open');
    });
  }

  // Submenús desplegables
  const submenuToggles = document.querySelectorAll('.submenu-toggle');

  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;

      if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('open');

        // Opcional: cerrar los demás submenús
        submenuToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            const otherSubmenu = otherToggle.nextElementSibling;
            if (otherSubmenu && otherSubmenu.classList.contains('submenu')) {
              otherSubmenu.classList.remove('open');
            }
          }
        });
      }
    });
  });
});
