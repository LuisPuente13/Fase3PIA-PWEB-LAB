import express from "express";
import sqlConnection from "../tools/dbconnection.js";

const router = express.Router();

router.get("/roles", async (req, res) => {
  const sql = await sqlConnection();

  const { recordset } = await sql.request().query("SELECT * FROM ROL");

  if (!recordset.length) {
    return res
      .status(404)
      .json({ success: false, message: "No existen registros" });
  }

  return res.status(200).json({ success: true, values: recordset });
});

router.get("/states", async (req, res) => {
  const sql = await sqlConnection();

  const { recordset } = await sql.request().query("SELECT * FROM ESTADO");

  if (!recordset.length) {
    return res
      .status(404)
      .json({ success: false, message: "No existen registros" });
  }

  return res.status(200).json({ success: true, values: recordset });
});

router.get("/status", async (req, res) => {
  const sql = await sqlConnection();

  const { recordset } = await sql.request().query("SELECT * FROM ESTATUS");

  if (!recordset.length) {
    return res
      .status(404)
      .json({ success: false, message: "No existen registros" });
  }

  return res.status(200).json({ success: true, values: recordset });
});

export default router;
