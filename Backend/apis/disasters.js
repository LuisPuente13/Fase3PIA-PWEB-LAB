//   Agregar --> ``

//   Corregir --> recordset por results

import express from "express";
import sqlConnection from "../tools/dbconnection.js";
import authMiddleware from "../tools/middlewares/jwt.js";

const router = express.Router();

router.get("/get", authMiddleware, async (req, res) => {
  const connection = await sqlConnection();
  connection.connect();

  const { results } = await sql.request().query(`
    SELECT d.IdDesastre, d.IdEstado, Estado.NombreEstado, d.IdEstatus, Estatus.NombreEstatus, NombreDesastre
    FROM `Desastre` d
    INNER JOIN `Estado` ON d.IdEstado = Estado.IdEstado
    INNER JOIN `Estatus` ON d.IdEstatus = Estatus.IdEstatus
    `);

  if (!results.length) {
    return res.status(200).json({
      success: true,
      values: [],
    });
  }

  return res.status(200).json({
    success: true,
    values: results.map((record) => ({
      id: record.IdDesastre,
      name: record.NombreDesastre,
      state: {
        id: record.IdEstado,
        name: record.NombreEstado,
      },
      status: {
        id: record.IdEstatus,
        name: record.NombreEstatus,
      },
    })),
  });
});

router.post("/add", authMiddleware, async (req, res) => {
  const { idEstado, idEstatus, nombre } = req.body;
  const connection = await sqlConnection();
  connection.connect();

  try {
    await sql
      .request()
      .input("idEstado", idEstado)
      .input("idEstatus", idEstatus)
      .input("nombre", nombre)
      .query(
        "INSERT INTO `DESASTRE` (IdEstado, IdEstatus, NombreDesastre) VALUES (@idEstado, @idEstatus, @nombre)"
      );

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/delete", authMiddleware, async (req, res) => {
  const { idDesastre } = req.body;
  const connection = await sqlConnection();
  connection.connect();

  try {
    await sql
      .request()
      .input("idDesastre", idDesastre)
      .query("DELETE FROM `DESASTRE` WHERE idDesastre = @idDesastre");

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/update", authMiddleware, async (req, res) => {
  const { idDesastre, idEstado, idEstatus, nombre } = req.body;
  const connection = await sqlConnection();
  connection.connect();

  try {
    await sql
      .request()
      .input("idEstado", idEstado)
      .input("idEstatus", idEstatus)
      .input("nombre", nombre)
      .input("idDesastre", idDesastre)
      .query(
        "UPDATE `DESASTRE` SET IdEstado = @idEstado, IdEstatus = @idEstatus, NombreDesastre = @nombre WHERE IdDesastre = @idDesastre"
      );

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
