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
    SELECT 
        Donacion.IdDonacion, 	
        Donacion.IdPaquete,
        Paquete.NombrePaquete,
        Donacion.IdDesastre, 
        Desastre.NombreDesastre,
        Donacion.IdEstatusEntrega,
        EstatusEntrega.NombreEstatus,
        FechaDonacion, 	
        Cantidad 
    FROM Donacion 
    INNER JOIN Paquete ON Donacion.IdPaquete = Paquete.IdPaquete
    INNER JOIN Desastre ON Donacion.IdDesastre = Desastre.IdDesastre
    INNER JOIN EstatusEntrega ON Donacion.IdEstatusEntrega = EstatusEntrega.IdEstatusEntrega
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
      id: record.IdDonacion,
      package: {
        id: record.IdPaquete,
        name: record.NombrePaquete,
      },
      disaster: {
        id: record.IdDesastre,
        name: record.NombreDesastre,
      },
      status: {
        id: record.IdEstatusEntrega,
        name: record.NombreEstatus,
      },
      date: record.FechaDonacion,
      quantity: record.Cantidad,
    })),
  });
});

router.post("/add", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { idPaquete, cantidad, idDesastre } = req.body;
  const connection = await sqlConnection();
  connection.connect();

  try {
    await sql
      .request()
      .input("userId", userId)
      .input("idPaquete", idPaquete)
      .input("cantidad", cantidad)
      .input("idDesastre", idDesastre)
      .query(
        "INSERT INTO `DONACION` (IdUsuario, IdPaquete, Cantidad, IdDesastre, FechaDonacion, IdEstatusEntrega) VALUES (@userId, @idPaquete, @cantidad, @idDesastre, GETDATE(), 1)"
      );

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;