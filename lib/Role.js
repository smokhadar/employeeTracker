const db = require("../db/connection");
const cTable = require("console.table");

class Role {
    constructor(id, title, salary, dpt_id) {
        this.id = id,
        this.title = title,
        this.salary = salary,
        this.dpt_id = dpt_id;
    }
    getAll() {
        const sql = `SELECT roles.title, roles.id, roles.salary, departments.title AS departments
        FROM employees
        LEFT JOIN roles ON (roles.id = employees.role_id)
        LEFT JOIN departments ON (departments.id = roles.dept_id)
        ORDER BY roles.title;`
        return db  
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    }
    addRole() {
        const sql = `INSERT INTO roles (dept_id, title, salary) VALUES (?,?,?)`;
        const params = [this.dpt_id, this.title, this.salary];
        console.log(sql, params);
        return db.promise().query(sql, params).then            .then(([rows]) => {
                return rows;
            });
    }
}

module.exports = Role;
