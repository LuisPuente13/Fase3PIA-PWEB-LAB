
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

    /* FASE 2 -->SOLICITAR VOLUNTARIADO */

    const modal = document.getElementById('voluntariado-modal');
    const solicitarVoluntariadoBtn = document.getElementById('solicitar-voluntariado-btn');
    const closeBtn = document.getElementsByClassName('close')[0];

    solicitarVoluntariadoBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const enviarVoluntariadoBtn = document.getElementById('enviar-voluntariado-btn');
    enviarVoluntariadoBtn.addEventListener('mouseover', () => {
        enviarVoluntariadoBtn.style.backgroundColor = '#45a049';
    });
    enviarVoluntariadoBtn.addEventListener('mouseout', () => {
        enviarVoluntariadoBtn.style.backgroundColor = '#4CAF50';
    });
    enviarVoluntariadoBtn.addEventListener('mousedown', () => {
        enviarVoluntariadoBtn.style.backgroundColor = '#397d3a';
    });
    enviarVoluntariadoBtn.addEventListener('mouseup', () => {
        enviarVoluntariadoBtn.style.backgroundColor = '#45a049';
    });
});

/* FASE 3 -->Despliegue BOTON PAGO*/

const pagoModal = document.getElementById('pago-modal');
const donarBtn = document.getElementById('donar-btn');
const closePagoBtn = document.getElementsByClassName('close')[1];

donarBtn.addEventListener('click', () => {
    pagoModal.style.display = 'block';
});

closePagoBtn.addEventListener('click', () => {
    pagoModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === pagoModal) {
        pagoModal.style.display = 'none';
    }
});

const pagarBtn = document.getElementById('pagar-btn');
pagarBtn.addEventListener('mouseover', () => {
    pagarBtn.style.backgroundColor = '#45a049';
});
pagarBtn.addEventListener('mouseout', () => {
    pagarBtn.style.backgroundColor = '#4CAF50';
});
pagarBtn.addEventListener('mousedown', () => {
    pagarBtn.style.backgroundColor = '#397d3a';
});
pagarBtn.addEventListener('mouseup', () => {
    pagarBtn.style.backgroundColor = '#45a049';
});