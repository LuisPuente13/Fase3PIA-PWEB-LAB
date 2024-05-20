document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("editModal");
    var btn = document.getElementById("editButton");
    var span = document.getElementsByClassName("close-button")[0];
    var saveBtn = document.getElementById("saveChanges");

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

    saveBtn.onclick = function() {
        var title = document.getElementById("editTitle").value;
        var description = document.getElementById("editDescription").value;
        var mainImage = document.getElementById("editMainImage").value;
        var section1Image = document.getElementById("editSection1Image").value;
        var section1Text = document.getElementById("editSection1Text").value;
        var section2Image = document.getElementById("editSection2Image").value;
        var section2Text = document.getElementById("editSection2Text").value;

        document.querySelector(".title").textContent = title;
        document.querySelector(".description").textContent = description;
        document.querySelector(".background-image").style.backgroundImage = `url(${mainImage})`;
        document.querySelectorAll(".section-image img")[0].src = section1Image;
        document.querySelectorAll(".section-text")[0].textContent = section1Text;
        document.querySelectorAll(".section-image img")[1].src = section2Image;
        document.querySelectorAll(".section-text")[1].innerHTML = section2Text;

        modal.style.display = "none";
    }
});
