import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoute from "./apis/auth.js";
import catalogsRoute from "./apis/catalogs.js";
import disastersRoute from "./apis/disasters.js";
import packages from "./apis/packages.js";
import donate from "./apis/donate.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/catalogs", catalogsRoute);
app.use("/api/disasters", disastersRoute);
app.use("/api/packages", packages);
app.use("/api/donate", donate);
app.listen(port, () => {
  console.log(`Helptous apis listening on port ${port}`);
});

