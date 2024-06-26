document.addEventListener('DOMContentLoaded', () => {
    // Botones de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
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
            const estado = button.getAttribute('data-estado');
            const calle = button.getAttribute('data-calle');
            const colonia = button.getAttribute('data-colonia');
            const municipio = button.getAttribute('data-municipio');
            const numeroExterior = button.getAttribute('data-numeroexterior');
            const numeroInterior = button.getAttribute('data-numerointerior');

            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = nombre;
            document.getElementById('editEstado').value = estado;
            document.getElementById('editCalle').value = calle;
            document.getElementById('editColonia').value = colonia;
            document.getElementById('editMunicipio').value = municipio;
            document.getElementById('editNumeroExterior').value = numeroExterior;
            document.getElementById('editNumeroInterior').value = numeroInterior;

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
        // Aquí puedes añadir la lógica para eliminar la bodega usando idAEliminar
        console.log("Eliminar bodega con ID:", idAEliminar);
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














/* FASE 1 -->BOTONES REDIRECCIONAR A OTRO HTML */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inicio').addEventListener('click', () => {
        window.location.href = ''; 
    });

    document.getElementById('donar').addEventListener('click', () => {
        window.location.href = ''; 
    });

    document.getElementById('mis-donaciones').addEventListener('click', () => {
        window.location.href = ''; 
    });

    document.getElementById('fotos').addEventListener('click', () => {
        window.location.href = ''; 
    });

    document.getElementById('nosotros').addEventListener('click', () => {
        window.location.href = ''; 
    });

    document.getElementById('donante').addEventListener('click', () => {
        window.location.href = 'donante.html'; 
    });

    document.getElementById('logout').addEventListener('click', () => {
        window.location.href = 'logout.html'; 
    });
});
