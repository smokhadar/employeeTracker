const db = require('../db/connection');
const cTable = require("console.table");

class Dpt {
    constructor(id, title) {
        (this.id = id),
        (this.title = title);
    }
    getAll() {
        const sql = `SELECT * FROM departments`
        return db 
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    }

    addDpt() {
        const sql = `INSERT INTO departments (title) VALUES ("${this.title}")`;
        return db.promise().query(sql); 
       }
}

module.exports = Dpt;