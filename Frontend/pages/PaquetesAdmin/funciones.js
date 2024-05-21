document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/packages/get", {
      headers: {
        Authorization: localStorage.getItem("helpToUsToken"),
      },
    });

    const packages = response.data.values;

    drawTable(packages);
  } catch (err) {
    alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
  }
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

  // Ventana emergente Editar
  const modalEditar = document.getElementById("modalEditar");
  const editarButtons = document.querySelectorAll(".editar");
  const closeEditarButton = modalEditar.querySelector(".close-button");

  editarButtons.forEach((button) => {
    button.onclick = function () {
      const id = button.getAttribute("data-id");
      const nombre = button.getAttribute("data-nombre");
      const descripcion = button.getAttribute("data-descripcion");
      const precio = button.getAttribute("data-precio");

      document.getElementById("editId").value = id;
      document.getElementById("editNombre").value = nombre;
      document.getElementById("editDescripcion").value = descripcion;
      document.getElementById("editPrecio").value = precio;

      modalEditar.style.display = "block";
    };
  });

  closeEditarButton.onclick = function () {
    modalEditar.style.display = "none";
  };

  // Ventana emergente Eliminar
  const modalEliminar = document.getElementById("modalEliminar");
  const eliminarButtons = document.querySelectorAll(".eliminar");
  const closeEliminarButton = modalEliminar.querySelector(".close-button");
  const aceptarEliminarButton = document.getElementById("aceptarEliminar");
  const rechazarEliminarButton = document.getElementById("rechazarEliminar");

  let idAEliminar;

  eliminarButtons.forEach((button) => {
    button.onclick = function () {
      idAEliminar = button.getAttribute("data-id");
      modalEliminar.style.display = "block";
    };
  });

  closeEliminarButton.onclick = function () {
    modalEliminar.style.display = "none";
  };

  rechazarEliminarButton.onclick = function () {
    modalEliminar.style.display = "none";
  };

  aceptarEliminarButton.onclick = async function () {
    try {
      await axios.post(
        "http://localhost:3000/api/packages/delete",
        { idPaquete: idAEliminar },
        {
          headers: {
            Authorization: localStorage.getItem("helpToUsToken"),
          },
        }
      );

      const response = await axios.get(
        "http://localhost:3000/api/packages/get",
        {
          headers: {
            Authorization: localStorage.getItem("helpToUsToken"),
          },
        }
      );
      const packages = response.data.values;
      drawTable(packages);
      modalEliminar.style.display = "none";
    } catch (err) {
      alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
    }
  };

  // Ventana emergente Reporte
  const modalReporte = document.getElementById("modalReporte");
  const reporteButton = document.getElementById("reporte");
  const closeReporteButton = modalReporte.querySelector(".close-button");

  reporteButton.onclick = function () {
    modalReporte.style.display = "block";
  };

  closeReporteButton.onclick = function () {
    modalReporte.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modalAgregar) {
      modalAgregar.style.display = "none";
    }
    if (event.target == modalEditar) {
      modalEditar.style.display = "none";
    }
    if (event.target == modalEliminar) {
      modalEliminar.style.display = "none";
    }
    if (event.target == modalReporte) {
      modalReporte.style.display = "none";
    }
  };

  document
    .getElementById("agregarForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      const { nombreAgregar, descripcionAgregar, precioAgregar } =
        Object.fromEntries(formData);

      try {
        await axios.post(
          "http://localhost:3000/api/packages/add",
          {
            name: nombreAgregar,
            description: descripcionAgregar,
            price: precioAgregar,
          },
          {
            headers: {
              Authorization: localStorage.getItem("helpToUsToken"),
            },
          }
        );
        alert("Paquete registrado correctamente!");
        modalAgregar.style.display = "none";

        const response = await axios.get(
          "http://localhost:3000/api/packages/get",
          {
            headers: {
              Authorization: localStorage.getItem("helpToUsToken"),
            },
          }
        );

        const packages = response.data.values;
        drawTable(packages);
      } catch (err) {
        alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
      }
    });

  document
    .getElementById("editarForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      const { editId, editNombre, editDescripcion, editPrecio } =
        Object.fromEntries(formData);

      try {
        await axios.post(
          "http://localhost:3000/api/packages/update",
          {
            idPaquete: editId,
            name: editNombre,
            description: editDescripcion,
            price: editPrecio,
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
          "http://localhost:3000/api/packages/get",
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
    $("#packages-table").empty();
    for (let row of disasters) {
      $("#packages-table").append(`
        <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.description}</td>
            <td>$${row.price}</td>
            <td>
                <div class="button-container">
                    <button
                    class="editar"
                    data-id=${row.id}
                    data-nombre=${row.name.split(" ").join("~")}
                    data-descripcion=${row.description.split(" ").join("~")}
                    data-precio=${row.price}
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
        const descripcion = button.getAttribute("data-descripcion");
        const precio = button.getAttribute("data-precio");

        document.getElementById("editId").value = id;
        document.getElementById("editNombre").value = nombre
          .split("~")
          .join(" ");
        document.getElementById("editDescripcion").value = descripcion
          .split("~")
          .join(" ");
        document.getElementById("editPrecio").value = precio;

        modalEditar.style.display = "block";
      };
    });
  }
});
