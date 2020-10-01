// REQUIRE
const inquirer = require("inquirer");

//MODULE
const addEmployees = require('./add-employees')

// SQL QUERY VARIABLES
const allEmployeesQuery =
  `SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      r.title, 
      d.name AS department,
      r.salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN employee m ON e.manager_id = m.id
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    `;

const allRolesQuery =
  `SELECT 
  id, 
  title,
  salary
FROM role;`

const allDepartmentsQuery =
  `SELECT * FROM department;`

// FUNCTION
function all(connection) {
  return new Promise(function (resolve, reject) {
    let query = allEmployeesQuery;

    connection.query(query, function (err, res) {
      if (err) return reject(err);

      console.log(''); // Leave empty line 
      console.log(''); // Leave empty line 
      console.table(res);
      console.log(''); // Leave empty line 

      resolve();
    });
  })
};

function byDepartment(connection) {
  return new Promise(function (resolve, reject) {
    let query = allEmployeesQuery + `ORDER BY department`;

    connection.query(query, function (err, res) {
      if (err) return reject(err);

      console.log(''); // Leave empty line 
      console.log(''); // Leave empty line 
      console.table(res);
      console.log(''); // Leave empty line 

      resolve();
    });
  })
};

function byManager(connection) {
  return new Promise(function (resolve, reject) {
    let query = allEmployeesQuery + `ORDER BY manager`;

    connection.query(query, function (err, res) {
      if (err) return reject(err);

      console.log(''); // Leave empty line 
      console.log(''); // Leave empty line 
      console.table(res);
      console.log(''); // Leave empty line 

      resolve();
    });
  })
};

function byRole(connection) {
  return new Promise(function (resolve, reject) {
    let query = allEmployeesQuery + `ORDER BY r.title`;

    connection.query(query, function (err, res) {
      if (err) return reject(err);

      console.log(''); // Leave empty line 
      console.log(''); // Leave empty line 
      console.table(res);
      console.log(''); // Leave empty line 

      resolve();
    });
  })
};

function onlyRoles(connection) {
  return new Promise(function (resolve, reject) {
    let query = allRolesQuery;

    connection.query(query, function (err, res) {
      if (err) return reject(err);

      console.log(''); // Leave empty line 
      console.log(''); // Leave empty line 
      console.table(res);
      console.log(''); // Leave empty line 

      resolve();
    });
  })
}

function onlyDepartments(connection) {
  return new Promise(function (resolve, reject) {
    let query = allDepartmentsQuery;

    connection.query(query, function (err, res) {
      if (err) return reject(err);

      console.log(''); // Leave empty line 
      console.log(''); // Leave empty line 
      console.table(res);
      console.log(''); // Leave empty line 

      resolve();
    });
  })
}

function departmentBudget(connection) {
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
          message: "What is the department?",
          choices: departmentList
        }
      ])
      .then((answer) => {

        // Find ID of selected department
        const departmentID = departmentTable.find((department) => answer.department === department.name).id;

        connection.query(
          `SELECT 
            d.name AS department,
            SUM(r.salary) used_budget
          FROM employee e
          JOIN role r ON e.role_id = r.id
          LEFT JOIN department d ON r.department_id = d.id
          WHERE d.id = ?
          `,
          [departmentID],
          function (err, res) {
            if (err) return reject(err);

            console.log(''); // Leave empty line 
            console.log(''); // Leave empty line 
            console.table(res);
            console.log(''); // Leave empty line 

            resolve();
          });
      })
  })
}

module.exports = {
  all,
  byDepartment,
  byManager,
  byRole,
  onlyRoles,
  onlyDepartments,
  departmentBudget
};