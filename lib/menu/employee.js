const Role = require('../Role');
const Employee = require("../Employee");
const inquirer = require('inquirer');
const menu = require("./menu");

function viewEmpMenu() {
    let employee = new Employee();
    employee
        .getAll()
        .then((rows) => {
            console.log(`
            =================
            All Employees
            =================`);
            console.table(rows);
        })
        .then(() => manageEmpMenu());
}

function manageEmpMenu() {
    inquirer
        .prompt([
            {   
                type: "list",
                name: "EmpMenu",
                message: "What else would you like to do?",
                choices: ["Add an employee", "Update an employee's role","Nothing, take me to the Main Menu"],
            }
        ])
        .then(({ EmpMenu }) => {
            switch (EmpMenu) {
                case "Add an employee":
                    console.clear();
                    addEmpMenu();
                    break;
                case "Update an employee's role":
                    console.clear();
                    updateEmployeeRoleMenu();
                    break;
                case "Nothing, take me to the Main Menu":
                    console.clear();
                    menu.mainMenu();
                    break;
            }
        })
}

function addEmpMenu() {
    console.clear();
    const role = new Role();
    const mgr = new Employee();
    role.getAll().then((roles) => {
            mgr.getAll().then((mgrs) => {
                let allManagers = mgrs.map((m) => {
                    return `${m.id} - ${m.first_name} ${m.last_name}`;
                });
                allManagers.push("None");
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'What is their role id?',
                            choices: roles.map((r) => {
                                return `${r.id} - ${r.title}`;
                            })
                        },
                        {
                            type: 'list',
                            name: 'manId',
                            message: "Who is the new employee's manager?",
                            choices: allManagers,
                        },
                        {
                            type: 'text',
                            name: 'firstName',
                            message: "What is the new employee's first name?",
                            validate: firstName => {
                                if(firstName) {
                                    return true;
                                } else {
                                    console.log('Enter their first name here.');
                                    return false;
                                }
                            }
                        }, 
                        {
                            type: 'text',
                            name: 'lastName',
                            message: 'What is their last name?',
                            validate: lastName => {
                                if (lastName) {
                                    return true;
                                } else {
                                    console.log('Enter their last name here.')
                                    return false;
                                }
                            }
                        },
                    ])
                    .then(({ firstName, lastName, roleId, manId }) => {
                        let truncRoleId = roleId.split(" ");
                        let truncManId = manId.split(" ");
                        const emp = new Employee(
                            null,
                            truncRoleId[0],
                            truncManId[0],
                            firstName,
                            lastName
                        );
                        emp.addEmployee();
                        console.clear();
                        viewEmpMenu();
                        console.table("Added employee \n");
                    });
            });
    });
};

function updateEmployeeRoleMenu() {
    console.clear();
    let role = new Role();
    role.getAll().then((roles) => {
        let emp = new Employee();
        emp.getAll().then((emps) => {
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "emp",
                        message: "Which employee's role do you want to update?",
                        choices: emps.map((e) => {
                            return `${e.id} - ${e.first_name} ${e.last_name}`;
                        }),
                    },
                    {
                        type: "list",
                        name: "roleSelect",
                        message: "Which role do you want to assign the selected employee?",
                        choices: roles.map((r) => {
                            return `${r.id} - ${r.title}`;
                        }),
                    },
                ])
                .then(({ emp, roleSelect}) => {
                    let eId = emp.split(" ");
                    let rId = roleSelect.split(" ");
                    let selectedEmp = new Employee(eId[0]);
                    selectedEmp.getEmployeeById().then((sEmp) => {
                        sEmp = sEmp[0];
                        let employee = new Employee(
                            sEmp.id,
                            rId[0],
                            sEmp.mgr_id,
                            sEmp.firstName,
                            sEmp.lastName,
                        );
                        employee.updateEmployee().then(() => {
                            console.log(`
                            Update was successful!
                            `);
                            viewEmpMenu();
                        });
                    });
                });
        });
    });
}

module.exports = {
    viewEmpMenu,
    manageEmpMenu,
    addEmpMenu,
    updateEmployeeRoleMenu,
};