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

    const statusSelects = document.querySelectorAll('.status');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            select.classList.remove('status-expirado', 'status-entregado', 'status-entregando', 'status-pendiente');
            
            switch (select.value) {
                case 'Expirado':
                    select.classList.add('status-expirado');
                    break;
                case 'Entregado':
                    select.classList.add('status-entregado');
                    break;
                case 'Entregando':
                    select.classList.add('status-entregando');
                    break;
                case 'Pendiente':
                    select.classList.add('status-pendiente');
                    break;
            }
        });

        // Trigger the change event to apply the initial color
        select.dispatchEvent(new Event('change'));
    });
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
        window.location.href = 'index.html'; 
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
