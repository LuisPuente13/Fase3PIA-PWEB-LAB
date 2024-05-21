import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso Denegado" });
  try {
    const decoded = jwt.verify(token, "QJzYLXDN3G");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token Invalido" });
  }
};

export default verifyToken;
