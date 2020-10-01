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

module.exports = {
    all,
    byDepartment,
    byManager,
    byRole,
};