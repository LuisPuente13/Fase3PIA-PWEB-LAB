document.addEventListener('DOMContentLoaded', () => {
    // Ventana emergente Agregar
    const modalAgregar = document.getElementById("modalAgregar");
    const agregarButton = document.getElementById("agregar");
    const closeAgregarButton = modalAgregar.querySelector(".close-button");

    agregarButton.onclick = function() {
        modalAgregar.style.display = "block";
    }

    closeAgregarButton.onclick = function() {
        modalAgregar.style.display = "none";
    }

    // Ventana emergente Editar
    const modalEditar = document.getElementById("modalEditar");
    const editarButtons = document.querySelectorAll(".editar");
    const closeEditarButton = modalEditar.querySelector(".close-button");

    editarButtons.forEach(button => {
        button.onclick = function() {
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-nombre');
            const descripcion = button.getAttribute('data-descripcion');
            const precio = button.getAttribute('data-precio');

            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = nombre;
            document.getElementById('editDescripcion').value = descripcion;
            document.getElementById('editPrecio').value = precio;

            modalEditar.style.display = "block";
        }
    });

    closeEditarButton.onclick = function() {
        modalEditar.style.display = "none";
    }

    // Ventana emergente Eliminar
    const modalEliminar = document.getElementById("modalEliminar");
    const eliminarButtons = document.querySelectorAll(".eliminar");
    const closeEliminarButton = modalEliminar.querySelector(".close-button");
    const aceptarEliminarButton = document.getElementById("aceptarEliminar");
    const rechazarEliminarButton = document.getElementById("rechazarEliminar");

    let idAEliminar;

    eliminarButtons.forEach(button => {
        button.onclick = function() {
            idAEliminar = button.getAttribute('data-id');
            modalEliminar.style.display = "block";
        }
    });

    closeEliminarButton.onclick = function() {
        modalEliminar.style.display = "none";
    }

    rechazarEliminarButton.onclick = function() {
        modalEliminar.style.display = "none";
    }

    aceptarEliminarButton.onclick = function() {
        // Aquí puedes añadir la lógica para eliminar el paquete usando idAEliminar
        console.log("Eliminar paquete con ID:", idAEliminar);
        modalEliminar.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalAgregar) {
            modalAgregar.style.display = "none";
        }
        if (event.target == modalEditar) {
            modalEditar.style.display = "none";
        }
        if (event.target == modalEliminar) {
            modalEliminar.style.display = "none";
        }
    }
});
