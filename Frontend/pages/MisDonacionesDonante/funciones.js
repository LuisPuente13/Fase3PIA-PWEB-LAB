/* FASE 1 -->LO QUE VEMOS EN PRIMERA INSTANCIA */

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/donate/get", {
      headers: {
        Authorization: localStorage.getItem("helpToUsToken"),
      },
    });

    const donates = response.data.values;

    drawTable(donates);
  } catch (err) {
    alert(err.response?.data?.message ?? "Ocurrio un error inesperado!");
  }

  const buttons = document.querySelectorAll(".header button");
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      if (!button.classList.contains("active")) {
        button.style.backgroundColor = "#90e890";
      }
    });
    button.addEventListener("mouseout", () => {
      if (!button.classList.contains("active")) {
        button.style.backgroundColor = "#a2fca2";
      }
    });
  });

  function drawTable(donates) {
    $("#misDonacionesTable").empty();
    for (let row of donates) {
      $("#misDonacionesTable").append(`
        <tr>
            <td>${row.id}</td>
            <td>${row.package.name}</td>
            <td>${row.disaster.name}</td>
            <td>${new Date(row.date).getDate()}/${
        new Date(row.date).getMonth() + 1
      }/${new Date(row.date).getFullYear()}</td>
             <td>${row.status.name}</td>
        </tr>
        `);
    }
  }
});

/* CAMBIAR COLOR DEL CAMPO SEGUN SU PALABRA*/
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".estatus").forEach((item) => {
    if (item.textContent.trim() === "Pendiente") {
      item.classList.add("estatus-pendiente");
    } else if (item.textContent.trim() === "Entregado") {
      item.classList.add("estatus-entregado");
    }
  });
});
