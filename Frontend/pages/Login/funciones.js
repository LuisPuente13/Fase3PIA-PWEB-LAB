document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/catalogs/roles"
    );

    let rolesSelect = document.getElementById("rol");

    for (let option of data.values) {
      var opt = document.createElement("option");
      opt.value = option.IdRol;
      opt.innerHTML = option.NombreRol;
      rolesSelect.appendChild(opt);
    }
  } catch (err) {
    alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
  }

  // Obtener el botón de Registrarse y el modal
  let registrarseBtn = document.getElementById("registrarseBtn");
  let modal = document.getElementById("registroModal");

  // Obtener el botón de cerrar del modal
  let closeBtn = document.querySelector(".close");

  // Cuando el usuario haga clic en Registrarse, mostrar el modal
  registrarseBtn.onclick = function () {
    modal.style.display = "block";
  };

  // Cuando el usuario haga clic en cerrar, ocultar el modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Cuando el usuario haga clic fuera del modal, ocultar el modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      const { email, password } = Object.fromEntries(formData);

      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem("helpToUsToken", data.token);
        localStorage.setItem("helpToUsUser", JSON.stringify(data.user));

        if (data.user.role.name === "Admin") {
          window.location.href = "../PaginaInicioAdmin/PaginaInicioAdmin.html";
          return;
        }

        window.location.href = "../PaginaInicioAdmin/PaginaInicioVD.html";
      } catch (err) {
        alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
      }
    });

  // Validar formulario de registro
  document
    .getElementById("registroForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      const {
        apellido,
        confirmPassword,
        emailRegistro,
        nombre,
        passwordRegistro,
        rol,
        terminos,
      } = Object.fromEntries(formData);

      if (passwordRegistro !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        // Evitar el envío del formulario si las contraseñas no coinciden
      }

      try {
        await axios.post("http://localhost:3000/api/auth/register", {
          email: emailRegistro,
          name: nombre,
          idRole: rol,
          password: passwordRegistro,
          lastName: apellido,
        });
        alert("usuario registrado correctamente!");
        modal.style.display = "none";
      } catch (err) {
        alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
      }
    });
});
