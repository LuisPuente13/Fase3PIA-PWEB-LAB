document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('edit-button');
    const modal = document.getElementById('edit-modal');
    const closeModal = document.getElementsByClassName('close')[0];

    editButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    const form = document.getElementById('edit-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const mainImage = document.getElementById('main-image').value;
        const section1Image = document.getElementById('section1-image').value;
        const section1Text = document.getElementById('section1-text').value;
        const section2Image = document.getElementById('section2-image').value;
        const section2Text = document.getElementById('section2-text').value;

        if (mainImage) {
            document.querySelector('.background-image').style.backgroundImage = `url('${mainImage}')`;
        }

        if (section1Image) {
            document.querySelectorAll('.section-image img')[0].src = section1Image;
        }

        if (section1Text) {
            document.querySelectorAll('.section-content p')[0].textContent = section1Text;
        }

        if (section2Image) {
            document.querySelectorAll('.section-image img')[1].src = section2Image;
        }

        if (section2Text) {
            document.querySelectorAll('.section-content p')[1].textContent = section2Text;
        }

        modal.style.display = 'none';
    });
});
