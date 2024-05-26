//   Agregar --> ``

//   Corregir --> recordset por results

//connection.query( --> validar

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
            "INSERT INTO `Usuario` (NombreUsuario, IdRol, Email, Contrasena, ApellidoUsuario) VALUES (?, ?, ?, ?, ?)",
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

  const connection = await sqlConnection();
  const { results } = await sql.request().input("email", email).query(`
    SELECT 
      u.IdUsuario, u.NombreUsuario, u.ApellidoUsuario, r.NombreRol, r.IdRol, u.Email, u.Contrasena 
    FROM USUARIO u
    INNER JOIN ROL r ON u.IdRol = r.IdRol
    WHERE u.Email = @email`);

  if (!results.length) {
    return res
      .status(500)
      .json({ success: false, message: "Usuario no existe" });
  }
  const responsePassword = results[0].Contrasena;
  comparePassword(password, responsePassword, async (err, isPasswordMatch) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Ocurrio un error inesperado" });
    }

    if (isPasswordMatch) {
      const user = {
        id: results[0].IdUsuario,
        name: results[0].NombreUsuario,
        lastName: results[0].ApellidoUsuario,
        role: {
          id: results[0].IdRol,
          name: results[0].NombreRol,
        },
        email: results[0].Email,
      };
      const token = jwt.sign(
        { id: results[0].IdUsuario, ...user },
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