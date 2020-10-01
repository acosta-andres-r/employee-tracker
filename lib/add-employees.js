// REQUIRE
const inquirer = require("inquirer");

// SQL QUERY VARIABLES
const newEmployeeQuery =
  `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?, ?, ?, ?)
  `;

const newRoleQuery =
  `INSERT INTO role (title, salary, department_id)
  VALUES (?, ?, ?)
  `;

const newDepartmentQuery =
  `INSERT INTO department (name)
  VALUES (?)
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

function newRole(connection) {
  return new Promise(async function (resolve, reject) {
    try {
      // Obtain table from database
      const departmentTable = await getTable('department', connection);
      // Obtain the list of existing departments
      const departmentList = departmentTable.map((department) => department.name)
      
      inquirer
        .prompt([
          {
            name: "role",
            type: "input",
            message: "What is the new Role?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the Role Salary?",
          },
          {
            name: "department",
            type: "rawlist",
            message: "What is the Role Department?",
            choices: departmentList
          }]
        ).then((answer) => {

          const departmentID = departmentTable.find((department) => answer.department === department.name).id;

          // Insert new role
          const query = newRoleQuery;

          connection.query(query,
            [answer.role, answer.salary, departmentID],
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

function newDepartment(connection) {
  return new Promise(async function (resolve, reject) {
    try {
      // Obtain table from database
      // const departmentTable = await getTable('department', connection);
      // Obtain the list of existing departments
      // const departmentList = departmentTable.map((department) => department.name)
      
      inquirer
        .prompt([
          {
            name: "department",
            type: "input",
            message: "What is the new Department?",
          },
          // {
          //   name: "salary",
          //   type: "input",
          //   message: "What is the Role Salary?",
          // },
          // {
          //   name: "department",
          //   type: "rawlist",
          //   message: "What is the Role Department?",
          //   choices: departmentList
          // }
        ]).then((answer) => {

          // const departmentID = departmentTable.find((department) => answer.department === department.name).id;

          // Insert new role
          const query = newDepartmentQuery;

          connection.query(query,
            [answer.department],
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
  newRole,
  newDepartment,
}