// REQUIRE
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const util = require('util');
const figlet = require('figlet');

// MODULES
const viewEmployees = require('./lib/view-employees')
const addEmployees = require('./lib/add-employees')
const removeEmployees = require('./lib/remove-employees')
const updateEmployees = require('./lib/update-employees')


// PROMISE
const figletAsync = util.promisify(figlet);

// SERVER CONNECTION
// Create a connection to employees database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'employee-tracker',
  password: '123456',
  database: 'employeesDB'
});

// Establishing connection with database
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  // Confimrmation that connection was established correctly
  console.log('connected as id ' + connection.threadId);

  // Start CLI application
  runCLIapp();
});

// FUCTIONS
async function runCLIapp() {
  try {
    // Create FIGfont of Employee Manager as Header
    console.log(await figletAsync("Employee"));
    console.log(await figletAsync("Manager"));
    console.log("");
    console.log("");

    // Run prompt with questions
    console.log("HERE");
    startPrompt();

  } catch (err) {
    throw err
  }
}

function startPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "View All Employees by Role",
        "Add New Employee",
        "Remove Employee",
        "Update Employee Names",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add New Role",
        "Remove Role",
        "View All Departments",
        "Add New Department",
        "Remove Department",
        "View Budget of Department",
        "Exit"
      ]
    })
    .then(async function (answer) {
      try {
        switch (answer.action) {
          case "View All Employees":
            await viewEmployees.all(connection);
            startPrompt();
            break;

          case "View All Employees by Department":
            await viewEmployees.byDepartment(connection);
            startPrompt();
            break;

          case "View All Employees by Manager":
            await viewEmployees.byManager(connection);
            startPrompt();
            break;

          case "View All Employees by Role":
            await viewEmployees.byRole(connection);
            startPrompt();
            break;

          case "Add New Employee":
            await addEmployees.newOne(connection);
            startPrompt();
            break;

          case "Remove Employee":
            await removeEmployees.deleteOne(connection);
            startPrompt();
            break;

          case "Update Employee Names":
            await updateEmployees.updateName(connection);
            startPrompt();
            break;

          case "Update Employee Role":
            await updateEmployees.updateRole(connection);
            startPrompt();
            break;

          case "Update Employee Manager":
            await updateEmployees.updateManager(connection);
            startPrompt();
            break;

          case "View All Roles":
            await viewEmployees.onlyRoles(connection);
            startPrompt();
            break;

          case "Add New Role":
            await addEmployees.newRole(connection);
            startPrompt();
            break;

          case "Remove Role":
            await removeEmployees.deleteRole(connection);
            startPrompt();
            break;

          case "View All Departments":
            await viewEmployees.onlyDepartments(connection);
            startPrompt();
            break;

          case "Add New Department":
            await addEmployees.newDepartment(connection);
            startPrompt();
            break;

          case "Remove Department":
            await removeEmployees.deleteDepartment(connection);
            startPrompt();
            break;

          case "View Budget of Department":

            break;

          case "Exit":
            connection.end();
            break;
        }
      }
      catch (err) {
        throw err
      }
    });
}