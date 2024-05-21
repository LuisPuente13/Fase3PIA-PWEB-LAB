document.addEventListener("DOMContentLoaded", async () => {
  try {
    const promises = [
      axios.get("http://localhost:3000/api/catalogs/status"),
      axios.get("http://localhost:3000/api/catalogs/states"),
      axios.get("http://localhost:3000/api/disasters/get", {
        headers: {
          Authorization: localStorage.getItem("helpToUsToken"),
        },
      }),
    ];

    const responses = await Promise.all(promises);
    const statuses = responses[0].data.values;
    const states = responses[1].data.values;
    const disasters = responses[2].data.values;

    let addEstadoSelect = document.getElementById("addEstado");
    let editEstadoSelect = document.getElementById("editEstado");

    for (let option of states) {
      let opt = document.createElement("option");
      opt.value = option.IdEstado;
      opt.innerHTML = option.NombreEstado;
      addEstadoSelect.appendChild(opt);
    }

    for (let option of states) {
      let opt = document.createElement("option");
      opt.value = option.IdEstado;
      opt.innerHTML = option.NombreEstado;
      editEstadoSelect.appendChild(opt);
    }

    let addEstatusSelect = document.getElementById("addEstatus");
    let editEstatusSelect = document.getElementById("editEstatus");

    for (let option of statuses) {
      let opt = document.createElement("option");
      opt.value = option.IdEstatus;
      opt.innerHTML = option.NombreEstatus;
      addEstatusSelect.appendChild(opt);
    }

    for (let option of statuses) {
      let opt = document.createElement("option");
      opt.value = option.IdEstatus;
      opt.innerHTML = option.NombreEstatus;
      editEstatusSelect.appendChild(opt);
    }

    drawTable(disasters);
  } catch (err) {
    alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
  }

  // Botones de navegación
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // Ventana emergente Agregar
  const modalAgregar = document.getElementById("modalAgregar");
  const agregarButton = document.getElementById("agregar");
  const closeAgregarButton = modalAgregar.querySelector(".close-button");

  agregarButton.onclick = function () {
    modalAgregar.style.display = "block";
  };

  closeAgregarButton.onclick = function () {
    modalAgregar.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modalAgregar) {
      modalAgregar.style.display = "none";
    }
  };

  // Ventana emergente Editar
  const modalEditar = document.getElementById("modalEditar");
  const closeEditarButton = modalEditar.querySelector(".close-button");

  closeEditarButton.onclick = function () {
    modalEditar.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modalEditar) {
      modalEditar.style.display = "none";
    }
  };

  // Ventana emergente Eliminar
  const modalEliminar = document.getElementById("modalEliminar");
  const closeEliminarButton = modalEliminar.querySelector(".close-button");
  const aceptarEliminarButton = document.getElementById("aceptarEliminar");
  const rechazarEliminarButton = document.getElementById("rechazarEliminar");

  let idAEliminar;

  closeEliminarButton.onclick = function () {
    modalEliminar.style.display = "none";
  };

  rechazarEliminarButton.onclick = function () {
    modalEliminar.style.display = "none";
  };

  aceptarEliminarButton.onclick = async function () {
    try {
      await axios.post(
        "http://localhost:3000/api/disasters/delete",
        { idDesastre: idAEliminar },
        {
          headers: {
            Authorization: localStorage.getItem("helpToUsToken"),
          },
        }
      );

      const response = await axios.get(
        "http://localhost:3000/api/disasters/get",
        {
          headers: {
            Authorization: localStorage.getItem("helpToUsToken"),
          },
        }
      );
      const disasters = response.data.values;
      drawTable(disasters);
      modalEliminar.style.display = "none";
    } catch (err) {
      alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
    }
  };

  window.onclick = function (event) {
    if (event.target == modalEliminar) {
      modalEliminar.style.display = "none";
    }
  };

  // Aplicar colores de estatus
  const estatusSelects = document.querySelectorAll(".estatus");
  estatusSelects.forEach((select) => {
    const estatus = select.getAttribute("data-estatus");
    updateSelectColor(select, estatus);
    select.addEventListener("change", function () {
      updateSelectColor(this, this.value);
    });
  });

  function updateSelectColor(select, estatus) {
    if (estatus === "Activo") {
      select.style.backgroundColor = "yellow";
    } else if (estatus === "Terminado") {
      select.style.backgroundColor = "lightgreen";
    }
  }

  document
    .getElementById("agregarForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      const { nombre, estado, estatus } = Object.fromEntries(formData);

      try {
        await axios.post(
          "http://localhost:3000/api/disasters/add",
          {
            idEstado: estado,
            idEstatus: estatus,
            nombre: nombre,
          },
          {
            headers: {
              Authorization: localStorage.getItem("helpToUsToken"),
            },
          }
        );
        alert("desastre registrado correctamente!");
        modalAgregar.style.display = "none";

        const response = await axios.get(
          "http://localhost:3000/api/disasters/get",
          {
            headers: {
              Authorization: localStorage.getItem("helpToUsToken"),
            },
          }
        );

        const disasters = response.data.values;
        drawTable(disasters);
      } catch (err) {
        alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
      }
    });

  document
    .getElementById("editarForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      const { editId, editNombre, editEstado, editEstatus } =
        Object.fromEntries(formData);

      try {
        await axios.post(
          "http://localhost:3000/api/disasters/update",
          {
            idDesastre: editId,
            idEstado: editEstado,
            idEstatus: editEstatus,
            nombre: editNombre,
          },
          {
            headers: {
              Authorization: localStorage.getItem("helpToUsToken"),
            },
          }
        );
        alert("Desastre actualizado correctamente!");
        modalEditar.style.display = "none";

        const response = await axios.get(
          "http://localhost:3000/api/disasters/get",
          {
            headers: {
              Authorization: localStorage.getItem("helpToUsToken"),
            },
          }
        );

        const disasters = response.data.values;
        drawTable(disasters);
      } catch (err) {
        alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
      }
    });

  function drawTable(disasters) {
    $("#disaster-table").empty();
    for (let row of disasters) {
      $("#disaster-table").append(`
        <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.state.name}</td>
            <td>${row.status.name}</td>
            <td>
                <div class="button-container">
                    <button
                    class="editar"
                    data-id=${row.id}
                    data-nombre=${row.name.split(" ").join("~")}
                    data-estado=${row.state.id}
                    data-estatus=${row.status.id}
                    >
                    Editar
                    </button>
                    <button class="eliminar" data-id=${row.id}>Eliminar</button>
                </div>
            </td>
        </tr>
        `);
    }
    mapDeleteButton();
    mapEditButton();
  }

  function mapDeleteButton() {
    const eliminarButtons = document.querySelectorAll(".eliminar");
    eliminarButtons.forEach((button) => {
      button.onclick = function () {
        idAEliminar = button.getAttribute("data-id");
        modalEliminar.style.display = "block";
      };
    });
  }

  function mapEditButton() {
    const editarButtons = document.querySelectorAll(".editar");
    editarButtons.forEach((button) => {
      button.onclick = function () {
        const id = button.getAttribute("data-id");
        const nombre = button.getAttribute("data-nombre");
        const estado = button.getAttribute("data-estado");
        const estatus = button.getAttribute("data-estatus");

        document.getElementById("editId").value = id;
        document.getElementById("editNombre").value = nombre
          .split("~")
          .join(" ");
        document.getElementById("editEstado").value = estado;
        document.getElementById("editEstatus").value = estatus;

        updateSelectColor(document.getElementById("editEstatus"), estatus);

        modalEditar.style.display = "block";
      };
    });
  }
});
