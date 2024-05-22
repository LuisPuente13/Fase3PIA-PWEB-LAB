import sql from "mssql";

const sqlConfig = Object.freeze({
  user: "sa",
  password: "Thomas17",
  database: "DB_DesastresV4",
  server: "ASUS",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
});

const sqlConnection = async () => {
  return await sql.connect(sqlConfig);
};

export default sqlConnection;
