import sql from "mssql";

const sqlConfig = Object.freeze({
  user: "saaa",
  password: "123456",
  database: "DB_DesastresV4",
  server: "DESKTOP-70VK3GE\\SQLEXPRESS",
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
