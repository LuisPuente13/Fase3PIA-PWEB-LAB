document.addEventListener('DOMContentLoaded', () => {
  // Obtener el botón de Registrarse y el modal
  var registrarseBtn = document.getElementById("registrarseBtn");
  var modal = document.getElementById("registroModal");

  // Obtener el botón de cerrar del modal
  var closeBtn = document.querySelector(".close");

  // Cuando el usuario haga clic en Registrarse, mostrar el modal
  registrarseBtn.onclick = function() {
      modal.style.display = "block";
  }

  // Cuando el usuario haga clic en cerrar, ocultar el modal
  closeBtn.onclick = function() {
      modal.style.display = "none";
  }

  // Cuando el usuario haga clic fuera del modal, ocultar el modal
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // Validar formulario de registro
  document.getElementById("registroForm").addEventListener("submit", function(event) {
      var password = document.getElementById("passwordRegistro").value;
      var confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden");
          event.preventDefault(); // Evitar el envío del formulario si las contraseñas no coinciden
      }
  });
});
