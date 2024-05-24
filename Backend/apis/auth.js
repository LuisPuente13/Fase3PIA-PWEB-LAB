import express from "express";
import jwt from "jsonwebtoken";
import sqlConnection from "../tools/dbconnection.js";
import { cryptPassword, comparePassword } from "../tools/password.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, name, idRole, password, lastName } = req.body;
  const connection = await sqlConnection();

  connection.connect();

  connection.query(
    "SELECT * FROM `Usuario` WHERE Email = ?",
    [email],
    function (error, results, fields) {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Ocurrio un error inesperado" });
      }
      if (results.length) {
        return res
          .status(500)
          .json({ success: false, message: "El email ya existe!" });
      }
      cryptPassword(password, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Ocurrio un error inesperado" });
        }

        try {
          connection.query(
            "INSERT INTO Usuario (NombreUsuario, IdRol, Email, Contrasena, ApellidoUsuario) VALUES (?, ?, ?, ?, ?)",
            [name, idRole, email, hash, lastName]
          );

          return res.status(200).json({ success: true });
        } catch (err) {
          return res
            .status(500)
            .json({ success: false, message: "Ocurrio un error inesperado" });
        }
      });
    }
  );
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = await sqlConnection();
  const { recordset } = await sql.request().input("email", email).query(`
    SELECT 
      u.IdUsuario, u.NombreUsuario, u.ApellidoUsuario, r.NombreRol, r.IdRol, u.Email, u.Contrasena 
    FROM USUARIO u
    INNER JOIN ROL r ON u.IdRol = r.IdRol
    WHERE u.Email = @email`);

  if (!recordset.length) {
    return res
      .status(500)
      .json({ success: false, message: "Usuario no existe" });
  }
  const responsePassword = recordset[0].Contrasena;
  comparePassword(password, responsePassword, async (err, isPasswordMatch) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Ocurrio un error inesperado" });
    }

    if (isPasswordMatch) {
      const user = {
        id: recordset[0].IdUsuario,
        name: recordset[0].NombreUsuario,
        lastName: recordset[0].ApellidoUsuario,
        role: {
          id: recordset[0].IdRol,
          name: recordset[0].NombreRol,
        },
        email: recordset[0].Email,
      };
      const token = jwt.sign(
        { id: recordset[0].IdUsuario, ...user },
        "QJzYLXDN3G"
      );

      return res.status(200).json({
        success: true,
        message: "Inicio sesion correctamente!",
        token: token,
        user: user,
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Password incorrecto" });
  });
});

export default router;