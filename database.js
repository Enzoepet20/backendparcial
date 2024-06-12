require("dotenv").config();
var sequelize = require("sequelize");
var db = new sequelize(
    "",
    "pma",
    "1234",
    {
        dialect: "mysql",
        host: "localhost",
        port:3307,
    }
);
module.exports = db;