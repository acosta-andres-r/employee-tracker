// REQUIRE
const inquirer = require("inquirer");

// SQL QUERY VARIABLES
const newEmployeeQuery =
  `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?, ?, ?, ?)
  `;

// FUNCTION
function getTable(tableName, connection) {
  return new Promise(function (resolve, reject) {
    // connection.query("SELECT * FROM role;", function (err, data) {
    connection.query("SELECT * FROM ??;", [tableName], function (err, data) {
      if (err) {
        return reject(err)
      }

      resolve(data);
    });
  })
};

function newOne(connection) {
  return new Promise(async function (resolve, reject) {
    try {
      // Obtain table from database
      const roleTable = await getTable('role', connection);
      const employeesTable = await getTable('employee', connection);

      // Obtain the list of existing roles
      const roleList = roleTable.map((role) => role.title)
      // Obtain the list of existing employees as Manager
      const employeeList = employeesTable.map((employee) => {
        return `${employee.first_name} ${employee.last_name}`
      })

      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
          },
          {
            name: "secondName",
            type: "input",
            message: "What is the employee's last name?"
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the employee's title?",
            choices: roleList
          },
          {
            name: "manager",
            type: "rawlist",
            message: "What is the employee's manager?",
            choices: employeeList
          }]
        ).then((answer) => {

          // Find IDs to create new register in the employee's table
          const roleID = roleTable.find((role) => answer.role === role.title).id
          const managerID = employeesTable[employeeList.indexOf(answer.manager)].id

          // Insert new employee
          const query = newEmployeeQuery

          connection.query(query,
            [answer.firstName, answer.secondName, roleID, managerID],
            function (err, res) {
              if (err) return reject(err);

              resolve();
            });

        })

    } catch (err) {
      reject(err);
    }

  })
};

module.exports = {
  getTable,
  newOne,
}