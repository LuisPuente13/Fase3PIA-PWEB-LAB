document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});


/* FASE 1 -->LO QUE VEMOS EN PRIMERA INSTANCIA */

document.addEventListener('DOMContentLoaded', () => {
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
});


document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.aceptar').forEach(item => {
        item.addEventListener('click', event => {
            alert('Aceptado');
        });
    });

    document.querySelectorAll('.rechazar').forEach(item => {
        item.addEventListener('click', event => {
            alert('Rechazado');
        });
    });
});

/* FASE 1 -->BOTONES REDIRECCIONAR A OTRO HTML */

