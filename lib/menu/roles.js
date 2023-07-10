const Role = require("../Role");
const Dpt = require("../Dpt");
const inquirer = require("inquirer");
const menu = require("./menu");

function viewAllRolesMenu() {
    let role = new Role();
    role 
        .getAll()
        .then((rows) => {
            console.log(`
            =================
            All Roles
            =================
            `);
            console.table(rows);
        })
        .then(() => manageRoleMenu());
}

function manageRoleMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "roleMenu",
                message: "What else would you like to do?",
                choices : ['Add a role', 'Nothing, take me to the Main Menu']
            }
        ])
        .then(({ roleMenu }) => {
            switch(roleMenu) {
                case "Add a role":
                    console.clear();
                    addRoleMenu();
                    break;
                case "Nothing, take me to the Main Menu":
                    console.clear();
                    menu.mainMenu();
                    break;
            }
        })
}

function addRoleMenu() {
    console.clear();
    const dpt = new Dpt();
    dpt.getAll().then((dpts) => {
        let allDpts = dpts.map((d) => {
            return `${d.id} - ${d.title}`;
        });
        inquirer
            .prompt([
               {
                    type: 'list',
                    name: 'deptId',
                    message: "What is the new role's department id?",
                   choices: allDpts,
                }, 
                {
                    type: 'input',
                    name: 'title',
                    message: "What is the new role's title?",
                    validate: title => {
                        if (title) {
                            return true;
                        } else {
                            console.log('Enter the title here.')
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                    validate: salary => {
                        //this looks wrong lol - make so checks if integer
                        if (salary) {
                            return true;
                        } else {
                            console.log('Enter a valid number please.');
                            return false;
                        }
                    }
                },
          ])
          .then(({ deptId, title, salary }) => {
            let truncDeptId = deptId.split(" ");
            const role = new Role(
                null, 
                title,
                salary,
                truncDeptId[0],
            );
            role.addRole();
            console.clear();
            viewAllRolesMenu();
            console.log(role);
            console.table("Added role \n");
          });
     });
}

module.exports = {
    viewAllRolesMenu,
    manageRoleMenu,
    addRoleMenu
}