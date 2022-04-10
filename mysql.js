const mysql = require("mysql");
const db_info = {
  host: "localhost",
  user: "min",
  password: "1234",
  port: "3306",
  database: "BURGER",
};

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "BURGER",
// });

module.exports = {
  init: () => {
    return mysql.createConnection(db_info);
  },
  connect: (conn) => {
    conn.connect((err) => {
      if (err) console.error("mysql connection error:" + err);
      else console.log("mysql is connected successfully!");
    });
  },
};
// connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
//   if (err) throw err;
//   console.log("The solution is: ", rows[0].solution);
// });

// connection.end();
