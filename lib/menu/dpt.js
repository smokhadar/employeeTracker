const Dpt = require('../Dpt');
const inquirer = require('inquirer');
const menu = require("./menu");

function viewDeptMenu() {
    let department = new Dpt();
    department 
        .getAll()
        .then((rows) => {
            console.log(`
            =================
            All Departments
             =================
            `);
            console.table(rows);
        })
        .then(() => manageDptMenu());
}

function manageDptMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "DptMenu",
                message: "What else would you like to do?",
                choices: ["Add a department", "Nothing, take me to the Main Menu"],
            },
        ])
        .then(({ DptMenu }) => {
            switch (DptMenu) {
                case "Add a department":
                    console.clear();
                    addDptMenu();
                    break;
                case "Nothing, take me to the Main Menu":
                    console.clear();
                    menu.mainMenu();
                    break;
            }
        });
}

function addDptMenu() {
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'newDptName',
                message: "What is the new department's name?",
                validate: deptname => {
                    if (!deptname) {
                        console.log('Enter the name here.')
                        return false;
                    } 
                    return true;
                }
            },
        ])
        .then(({ newDptName }) => {
            const dpt = new Dpt(null, newDptName);
            dpt.addDpt();
            console.clear();
            viewDeptMenu();
            console.table("Added department \n");
        });
}

module.exports = { viewDeptMenu, addDptMenu};