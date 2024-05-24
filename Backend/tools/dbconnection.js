import mysql from "mysql";

const sqlConnection = async () => {
  return mysql.createConnection({
    host: "database-1.c7mcm644e58m.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "123456789",
    database: "DB_DesastresV4",
  });
};

export default sqlConnection;
