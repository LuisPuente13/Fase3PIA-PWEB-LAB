document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});


// Obtener el botón de editar
var editButton = document.querySelector('.edit-button');

// Obtener la ventana emergente
var popup = document.getElementById('popup');

// Obtener el botón para cerrar la ventana emergente
var closeBtn = document.querySelector('.close');

// Mostrar la ventana emergente al hacer clic en el botón de editar
editButton.addEventListener('click', function() {
    popup.style.display = 'block';
});

// Ocultar la ventana emergente al hacer clic en el botón de cerrar
closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Ocultar la ventana emergente al hacer clic fuera de ella
window.addEventListener('click', function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

