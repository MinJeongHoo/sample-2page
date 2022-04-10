const express = require("express");
const mysql = require("./mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.json());
const cors = require("cors");
require("dotenv").config();
const conn = mysql.init();
mysql.connect(conn);
app.use(cors());
// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  conn.query("SELECT * FROM burgerInfo", (err, rows, fields) => {
    if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      res.send(rows);
    }
  });
});

app.delete("/delete", function (req, res) {
  const sql = "DELETE FROM burgerInfo";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    res.send({ status: "SUCCESS" });
  });
});

app.post("/insert", function (req, res) {
  const sql = "INSERT INTO burgerInfo(name,price,id) VALUES(?,?,?);";
  var params = [req.body.name, req.body.price, "12"];
  conn.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
    }
  });
  conn.query("SELECT * FROM burgerInfo", (err, rows, fields) => {
    if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
