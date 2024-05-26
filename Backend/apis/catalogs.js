//   Agregar --> ``

//   Corregir --> recordset por results

import express from "express";
import sqlConnection from "../tools/dbconnection.js";

const router = express.Router();

// Ejemplo MySQL (Login)

router.get("/roles", async (req, res) => {
  const connection = await sqlConnection();
  connection.connect();

  connection.query("SELECT * FROM `Rol`", function (error, results, fields) {

    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Ocurrio un error inesperado" });
    }
    if (!results.length) {
      return res
        .status(404)
        .json({ success: false, message: "No existen registros" });
    }

    return res.status(200).json({ success: true, values: results });
  });
  connection.end();
});


// CAMBIAR SQLSERVER --> MYSQL
router.get("/states", async (req, res) => {
  const connection = await sqlConnection();
  connection.connect();

  connection.query("SELECT * FROM `ESTADO`", function (error, results, fields) {

  if (!results.length) {
    return res
      .status(404)
      .json({ success: false, message: "No existen registros" });
  }

  return res.status(200).json({ success: true, values: results });
});
connection.end();
});


// CAMBIAR SQLSERVER --> MYSQL
router.get("/status", async (req, res) => {
  const connection = await sqlConnection();
connection.connect();


  connection.query("SELECT * FROM `ESTATUS`", function (error, results, fields) {

  if (!results.length) {
    return res
      .status(404)
      .json({ success: false, message: "No existen registros" });
  }

  return res.status(200).json({ success: true, values: results });
});
connection.end();
});
export default router;
