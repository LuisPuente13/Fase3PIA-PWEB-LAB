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
        var image = document.getElementById("editImage").value;

        document.querySelector(".title").textContent = title;
        document.querySelector(".description").textContent = description;
        document.querySelector(".background-image").style.backgroundImage = `url(${image})`;

        modal.style.display = "none";
    }
});

