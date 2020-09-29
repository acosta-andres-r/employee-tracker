/* Seeds for SQL table.*/
USE employeesDB;

/* Insert 3 Rows into DEPARTMENT table. */
INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");


/* Insert 3 Rows into ROLE table. */
INSERT INTO role (title, salary)
VALUES ("Lead Engineer", 150000), 
       ("Software Engineer", 120000), 
       ("Salesperson", 80000),
       ("Sales Lead", 100000),
       ("Accountant", 125000),
       ("Legal Team Lead", 250000),
       ("Lawyer", 190000);

INSERT INTO employee (first_name, last_name)
VALUES ("John", "Doe"),
       ("Ashley", "Rodriguez"),
       ("Malia", "Brown"),
       ("Sarah", "Lourd");



