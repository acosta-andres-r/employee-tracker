// REQUIRE
const inquirer = require('inquirer');

//MODULE
const addEmployees = require('./add-employees')

// SQL QUERY VARIABLES
const removeEmployeeQuery =
  `DELETE FROM employee WHERE id = ?
  `;

// FUNCTION
function deleteOne(connection) {
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
          message: "What is the employee to remove?",
          choices: employeeList
        }
      ])
      .then((answer) => {

        // Find ID of selected employee
        const employeeID = employeesTable[employeeList.indexOf(answer.name)].id

        let query = removeEmployeeQuery;

        connection.query(query,
          [employeeID],
          function (err, res) {
            if (err) return reject(err);

            resolve();
          });
      })
  })
}

module.exports = {
  deleteOne,
}