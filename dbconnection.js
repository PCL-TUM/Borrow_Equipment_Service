var mysql = require("mysql");

// localhost DB
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "project",
  database: "db_be",
});

// digitalocean DB
/* var db = mysql.createConnection({
  host: "157.230.254.198",
  user: "be",
  password: "project",
  database: "db_be",
}); */

module.exports = db;
