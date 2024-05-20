
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

/* CAMBIAR COLOR DEL CAMPO SEGUN SU PALABRA*/
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.estatus').forEach(item => {
        if (item.textContent.trim() === 'Pendiente') {
            item.classList.add('estatus-pendiente');
        } else if (item.textContent.trim() === 'Entregado') {
            item.classList.add('estatus-entregado');
        }
    });
});

