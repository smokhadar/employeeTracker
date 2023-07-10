const db = require("../db/connection");
const cTable = require("console.table");

class Employee {
  constructor (id, role_id, mgr_id, first_name, last_name) {
    (this.id = id),
    (this.role_id = role_id),
    (this.mgr_id = mgr_id),
    (this.first_name = first_name),
    (this.last_name = last_name);
  }
  getAll() {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.title AS departments, roles.salary AS salary, roles.title AS role, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN employees managers on managers.id = employees.manager_id
    INNER JOIN roles on (roles.id = employees.role_id)
    INNER JOIN departments ON (departments.id = roles.departments_id)
    ORDER BY employees.id;`;
    return db
      .promise()
      .query(sql)
      .then(([row]) => {
        return row;
      });
  }

  addEmployee() {
    const sql = `INSERT INTO employees (role_id, manager_id, first_name, last_name)
    VALUES (?,?,?,?);`;
    const params = [this.role_id, this.mgr_id, this.first_name, this.last_name];
    return db.promise().query(sql, params);
  }

  getEmployeeById() {
    const sql = `SELECT * FROM employees WHERE id = '${this.id}';`;
    return db
      .promise()
      .query(sql)
      .then(([row]) => {
        return row;
      });
  }

  updateEmployee() {
    const sql = `UPDATE employees SET role_id = ? WHERE id = '${this.id}'`;
    const params = [this.role_id];
    return db
      .promise()
      .query(sql, params)
      .then(([rows]) => {
        return rows;
      });
  }
}

module.exports = Employee;