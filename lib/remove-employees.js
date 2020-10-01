// REQUIRE
const inquirer = require('inquirer');

//MODULE
const addEmployees = require('./add-employees')

// SQL QUERY VARIABLES
const removeEmployeeQuery =
  `DELETE FROM employee WHERE id = ?
  `;

const removeRoleQuery =
  `DELETE FROM role WHERE id = ?
  `;

  const removeDepartmentQuery =
  `DELETE FROM department WHERE id = ?
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

function deleteRole(connection) {
  return new Promise(async function (resolve, reject) {

    // Obtain table from database
    const roleTable = await addEmployees.getTable('role', connection);
    // Obtain the list of existing Roles
    const roleList = roleTable.map((role) => role.title)

    inquirer
      .prompt([
        {
          name: "role",
          type: "rawlist",
          message: "What is the role to remove?",
          choices: roleList
        }
      ])
      .then((answer) => {

        // Find ID of selected role
        const roleID = roleTable.find((role) => answer.role === role.title).id

        let query = removeRoleQuery;

        connection.query(query,
          [roleID],
          function (err, res) {
            if (err) return reject(err);

            resolve();
          });
      })
  })
}

function deleteDepartment(connection) {
  return new Promise(async function (resolve, reject) {

    // Obtain table from database
    const departmentTable = await addEmployees.getTable('department', connection);
    // Obtain the list of existing departments
    const departmentList = departmentTable.map((department) => department.name)

    inquirer
      .prompt([
        {
          name: "department",
          type: "rawlist",
          message: "What is the department to remove?",
          choices: departmentList
        }
      ])
      .then((answer) => {

        // Find ID of selected department
        const departmentID = departmentTable.find((department) => answer.department === department.name).id;

        let query = removeDepartmentQuery;

        connection.query(query,
          [departmentID],
          function (err, res) {
            if (err) return reject(err);

            resolve();
          });
      })
  })
}

module.exports = {
  deleteOne,
  deleteRole,
  deleteDepartment
}