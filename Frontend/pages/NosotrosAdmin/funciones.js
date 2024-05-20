document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("edit-modal");
    var btn = document.getElementById("edit-button");
    var span = document.getElementsByClassName("close")[0];
    var saveBtn = document.getElementById("edit-form").querySelector("button[type='submit']");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    saveBtn.onclick = function(event) {
        event.preventDefault(); // Prevenir que el formulario se envíe

        var mainImage = document.getElementById("main-image").value;
        var section1Image = document.getElementById("section1-image").value;
        var section1Text = document.getElementById("section1-text").value;
        var section2Image = document.getElementById("section2-image").value;
        var section2Text = document.getElementById("section2-text").value;

        // Actualizar contenido en la página
        document.querySelector(".background-image").style.backgroundImage = `url(${mainImage})`;
        document.querySelector(".section-image img").src = section1Image;
        document.querySelector(".section-content p").textContent = section1Text;
        document.querySelectorAll(".section-image img")[1].src = section2Image;
        document.querySelectorAll(".section-content p")[1].textContent = section2Text;

        modal.style.display = "none";
    }
});
