import express from "express";
import sqlConnection from "../tools/dbconnection.js";
import authMiddleware from "../tools/middlewares/jwt.js";

const router = express.Router();

router.get("/get", authMiddleware, async (req, res) => {
  const sql = await sqlConnection();

  const { recordset } = await sql.request().query(`
    SELECT IdPaquete, NombrePaquete, Descripcion, Precio FROM Paquete 
    `);

  if (!recordset.length) {
    return res.status(200).json({
      success: true,
      values: [],
    });
  }

  return res.status(200).json({
    success: true,
    values: recordset.map((record) => ({
      id: record.IdPaquete,
      name: record.NombrePaquete,
      description: record.Descripcion,
      price: record.Precio,
    })),
  });
});

router.post("/add", authMiddleware, async (req, res) => {
  const { name, description, price } = req.body;
  console.log("req.body", req.body);
  const sql = await sqlConnection();

  try {
    await sql
      .request()
      .input("NombrePaquete", name)
      .input("Descripcion", description)
      .input("Precio", price)
      .query(
        "INSERT INTO PAQUETE (NombrePaquete, Descripcion, Precio) VALUES (@NombrePaquete, @Descripcion, @Precio)"
      );

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/delete", authMiddleware, async (req, res) => {
  const { idPaquete } = req.body;
  const sql = await sqlConnection();

  try {
    await sql
      .request()
      .input("idPaquete", idPaquete)
      .query("DELETE FROM PAQUETE WHERE idPaquete = @idPaquete");

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/update", authMiddleware, async (req, res) => {
  const { idPaquete, name, description, price } = req.body;
  const sql = await sqlConnection();

  try {
    await sql
      .request()
      .input("NombrePaquete", name)
      .input("Descripcion", description)
      .input("Precio", price)
      .input("idPaquete", idPaquete)
      .query(
        "UPDATE PAQUETE SET NombrePaquete = @NombrePaquete, Descripcion = @Descripcion, Precio = @Precio WHERE idPaquete = @idPaquete"
      );

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
