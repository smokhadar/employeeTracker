const inquirer = require('inquirer');
const { viewDeptMenu, addDptMenu } = require("./dpt");
const { viewAllRolesMenu, addRoleMenu } = require("./roles");
const {
        viewEmpMenu,
        addEmpMenu,
        updateEmployeeRoleMenu
} = require('./employee');

exports.mainMenu = mainMenu;

function mainMenu() {
    console.clear();
    console.log('Welcome to Employee Tracker!');
    console.log("MAIN MENU");
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: ["View All Employees", new inquirer.Separator(), "Add Employee", new inquirer.Separator(), "Update Employee Role", new inquirer.Separator(), "View All Roles", new inquirer.Separator(), "Add Role", new inquirer.Separator(), "View All Departments",new inquirer.Separator(), "Add Department", new inquirer.Separator()],
                default: "View All Employees"
            },
        ])
        .then(({ options }) => {
            switch (options) {
                case "View All Departments":
                    console.clear();
                    viewDeptMenu();
                    break;
                case "Add Department":
                    console.clear();
                    addDptMenu();
                    break;
                case "View All Roles":
                    console.clear();
                    viewAllRolesMenu();
                    break;
                case "Add Role":
                    console.clear();
                    addRoleMenu();
                    break;
                case "View All Employees":
                    console.clear();
                    viewEmpMenu();
                    break;
                case "Add Employee":
                    console.clear();
                    addEmpMenu();
                    break;
                case "Update Employee Role":
                    console.clear();
                    updateEmployeeRoleMenu();
                    break;
                case "Exit":
                    console.clear();
                    exit();
                    break;
            }
        });
}