// REQUIRE
const inquirer = require('inquirer');

//MODULE
const addEmployees = require('./add-employees')

// SQL QUERY VARIABLES
const updateNamesQuery =
  `UPDATE employee 
    SET 
        first_name = ?, 
        last_name = ?
    WHERE id = ?
  `;

const updateRoleQuery =
  `UPDATE employee 
    SET 
      role_id = ?
    WHERE id = ?
  `;

const updateEmployeeQuery =
  `UPDATE employee 
    SET 
        first_name = ?, 
        last_name = ?, 
        role_id = ?, 
        manager_id = ? 
    WHERE id = ?
  `;

// FUNCTION
function updateName(connection) {
  return new Promise(async function (resolve, reject) {

    // Obtain table from database
    const employeesTable = await addEmployees.getTable('employee', connection);
    // Obtain the list of existing employees as Manager
    const employeeList = employeesTable.map((employee) => {
      return `${employee.first_name} ${employee.last_name}`
    })

    inquirer
      .prompt([
        {
          name: "name",
          type: "rawlist",
          message: "What is the employee to update?",
          choices: employeeList
        }
      ])
      .then(async function (answer) {

        // Find selected employee to update
        const employee = employeesTable[employeeList.indexOf(answer.name)]

        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employee's first name?",
              default: employee.first_name
            },
            {
              name: "secondName",
              type: "input",
              message: "What is the employee's last name?",
              default: employee.last_name
            }
          ]).then((ans) => {

            console.log(ans)

            // Insert new employee
            let query = updateNamesQuery;

            connection.query(query,
              [ans.firstName, ans.secondName, employee.id],
              function (err, res) {
                if (err) return reject(err);

                resolve();
              });
          })
      })
  })
}

function updateRole(connection) {
  return new Promise(async function (resolve, reject) {

    // Obtain table from database
    const employeesTable = await addEmployees.getTable('employee', connection);
    // Obtain the list of existing employees as Manager
    const employeeList = employeesTable.map((employee) => {
      return `${employee.first_name} ${employee.last_name}`
    })

    inquirer
      .prompt([
        {
          name: "name",
          type: "rawlist",
          message: "What is the employee to update?",
          choices: employeeList
        }
      ])
      .then(async function (answer) {

        // Find selected employee to update
        const employee = employeesTable[employeeList.indexOf(answer.name)]

        // Obtain table from database
        const roleTable = await addEmployees.getTable('role', connection);
        // Obtain the list of existing roles
        const roleList = roleTable.map((role) => role.title)

        inquirer
          .prompt([
            {
              name: "role",
              type: "rawlist",
              message: "What is the employee's title?",
              default: (employee.role_id - 1),
              choices: roleList
            }
 
          ]).then((ans) => {

            console.log(ans)

            // Find IDs to create new register in the employee's table
            const roleID = roleTable.find((role) => ans.role === role.title).id

            // Update New Role
            let query = updateRoleQuery;

            connection.query(query,
              [roleID, employee.id],
              function (err, res) {
                if (err) return reject(err);

                resolve();
              });
          })
      })
  })
}

function updateManager(connection) {
  return new Promise(async function (resolve, reject) {

    // Obtain table from database
    const employeesTable = await addEmployees.getTable('employee', connection);
    // Obtain the list of existing employees as Manager
    const employeeList = employeesTable.map((employee) => {
      return `${employee.first_name} ${employee.last_name}`
    })

    inquirer
      .prompt([
        {
          name: "name",
          type: "rawlist",
          message: "What is the employee to update?",
          choices: employeeList
        }
      ])
      .then(async function (answer) {

        // Find selected employee to update
        const employee = employeesTable[employeeList.indexOf(answer.name)]

        // Obtain table from database
        const roleTable = await addEmployees.getTable('role', connection);
        // Obtain the list of existing roles
        const roleList = roleTable.map((role) => role.title)

        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employee's first name?",
              default: employee.first_name
            },
            {
              name: "secondName",
              type: "input",
              message: "What is the employee's last name?",
              default: employee.last_name
            },
            {
              name: "role",
              type: "rawlist",
              message: "What is the employee's title?",
              default: (employee.role_id - 1),
              choices: roleList
            },
            {
              name: "manager",
              type: "rawlist",
              message: "What is the employee's manager?",
              default: (employee.manager_id - 1),
              choices: employeeList
            }]
          ).then((ans) => {

            console.log(ans)

            // Find IDs to create new register in the employee's table
            const roleID = roleTable.find((role) => ans.role === role.title).id
            const managerID = employeesTable[employeeList.indexOf(ans.manager)].id

            // Insert new employee
            let query = updateEmployeeQuery;

            connection.query(query,
              [ans.firstName, ans.secondName, roleID, managerID, employee.id],
              function (err, res) {
                if (err) return reject(err);

                resolve();
              });
          })
      })
  })
}

function updateManager(connection) {
  return new Promise(async function (resolve, reject) {

    // Obtain table from database
    const employeesTable = await addEmployees.getTable('employee', connection);
    // Obtain the list of existing employees as Manager
    const employeeList = employeesTable.map((employee) => {
      return `${employee.first_name} ${employee.last_name}`
    })

    inquirer
      .prompt([
        {
          name: "name",
          type: "rawlist",
          message: "What is the employee to update?",
          choices: employeeList
        }
      ])
      .then(async function (answer) {

        // Find selected employee to update
        const employee = employeesTable[employeeList.indexOf(answer.name)]

        // Obtain table from database
        const roleTable = await addEmployees.getTable('role', connection);
        // Obtain the list of existing roles
        const roleList = roleTable.map((role) => role.title)

        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employee's first name?",
              default: employee.first_name
            },
            {
              name: "secondName",
              type: "input",
              message: "What is the employee's last name?",
              default: employee.last_name
            },
            {
              name: "role",
              type: "rawlist",
              message: "What is the employee's title?",
              default: (employee.role_id - 1),
              choices: roleList
            },
            {
              name: "manager",
              type: "rawlist",
              message: "What is the employee's manager?",
              default: (employee.manager_id - 1),
              choices: employeeList
            }]
          ).then((ans) => {

            console.log(ans)

            // Find IDs to create new register in the employee's table
            const roleID = roleTable.find((role) => ans.role === role.title).id
            const managerID = employeesTable[employeeList.indexOf(ans.manager)].id

            // Insert new employee
            let query = updateEmployeeQuery;

            connection.query(query,
              [ans.firstName, ans.secondName, roleID, managerID, employee.id],
              function (err, res) {
                if (err) return reject(err);

                resolve();
              });
          })
      })
  })
}

module.exports = {
  updateName,
  updateRole,
}