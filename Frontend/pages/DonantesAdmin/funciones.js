document.addEventListener('DOMContentLoaded', () => {
    // Botones de navegación
    const buttons = document.querySelectorAll('.header button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = '#90e890';
            }
        });
        button.addEventListener('mouseout', () => {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = '#a2fca2';
            }
        });
    });

    // Datos de ejemplo para las solicitudes
    const solicitudes = [
        { id: 1, nombre: 'Juan', email: 'juan@example.com', solicitud: 'Quiero donar más paquetes.' },
        { id: 2, nombre: 'Maria', email: 'maria@example.com', solicitud: 'Quiero donar más paquetes' },
        { id: 3, nombre: 'Carlos', email: 'carlos@example.com', solicitud: 'Quiero donar más paquetes' }
    ];

    // Ventana emergente Solicitudes
    const modalSolicitudes = document.getElementById("modalSolicitudes");
    const solicitudesButton = document.getElementById("solicitudes");
    const closeSolicitudesButton = modalSolicitudes.querySelector(".close-button");
    const solicitudesContainer = document.querySelector(".solicitudes-container");

    // Generar contenido dinámico para las solicitudes
    solicitudesButton.onclick = function() {
        solicitudesContainer.innerHTML = ''; // Limpiar contenedor
        solicitudes.forEach(solicitud => {
            const solicitudDiv = document.createElement('div');
            solicitudDiv.classList.add('solicitud');
            solicitudDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${solicitud.nombre}</p>
                <p><strong>Email:</strong> ${solicitud.email}</p>
                <p><strong>Solicitud:</strong> ${solicitud.solicitud}</p>
                <div class="button-container">
                    <button class="aceptar">Aceptar</button>
                    <button class="rechazar">Rechazar</button>
                </div>
            `;
            solicitudesContainer.appendChild(solicitudDiv);

            const aceptarButton = solicitudDiv.querySelector('.aceptar');
            const rechazarButton = solicitudDiv.querySelector('.rechazar');

            aceptarButton.onclick = function() {
                mostrarConfirmacion('Solicitud aceptada.');
            }

            rechazarButton.onclick = function() {
                mostrarConfirmacion('Solicitud rechazada.');
            }
        });
        modalSolicitudes.style.display = "block";
    }

    closeSolicitudesButton.onclick = function() {
        modalSolicitudes.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalSolicitudes) {
            modalSolicitudes.style.display = "none";
        }
    }

    // Ventana emergente Confirmación
    const modalConfirmacion = document.getElementById("modalConfirmacion");
    const closeConfirmacionButton = modalConfirmacion.querySelector(".close-button");
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

    function mostrarConfirmacion(mensaje) {
        mensajeConfirmacion.textContent = mensaje;
        modalConfirmacion.style.display = "block";
    }

    closeConfirmacionButton.onclick = function() {
        modalConfirmacion.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalConfirmacion) {
            modalConfirmacion.style.display = "none";
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
