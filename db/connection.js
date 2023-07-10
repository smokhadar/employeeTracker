const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: "root",
        password: "lavender",
        database: "company_db"
    },
    console.log("Connected to the Employee Tracking database.")
);

module.exports = db;