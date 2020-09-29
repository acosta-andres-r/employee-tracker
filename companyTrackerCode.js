const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const util = require('util');
const figlet = require('figlet');

const figletAsync = util.promisify(figlet);

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


async function runCLIapp() {
  try {
    // Create FIGfont of Employee Manager as Header
    console.log(await figletAsync("Employee"));
    console.log(await figletAsync("Manager"));
    console.log("");
    console.log("");

    // Run prompt with questions
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
        "Add New Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add new Role",
        "Remove Role",
        "Add New Department",
        "Remove Department",
        "View Budget of a Department",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Employees by Department":

          break;

        case "View All Employees by Manager":

          break;

        case "Add New Employee":

          break;

        case "Remove Employee":

          break;

        case "Update Employee Role":

          break;

        case "Update Employee Manager":

          break;

        case "View All Roles":

          break;

        case "Add New Role":

          break;

        case "Remove Role":

          break;

        case "Add New Department":

          break;

        case "Remove Department":

          break;

        case "View Budget of a Department":

          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

