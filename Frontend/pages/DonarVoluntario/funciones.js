document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
    // Funcionalidad para el modal de pago
    const pagoModal = document.getElementById('pago-modal');
    const donarBtn = document.querySelector('.form-container button[type="button"]');
    const closePagoBtn = document.querySelector('#pago-modal .close');

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
});
