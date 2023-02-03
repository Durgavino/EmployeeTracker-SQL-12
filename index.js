const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const path = require('path');

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'bootcamp',
    database: 'EmployeeTracker_db'
  },
  console.log(`Connected to the EmployeeTracker_db database.`)
);

const options = [
  {
    type: "list",
    message: "What Would you like to do?",
    name: "option",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
    ]
  }

];



function init() {
  inquirer.prompt(options)
    .then(data => {
      console.log(data);
      if (data.option === "View all Departments") {
        console.log(data.option);
        return viewallDepartment();
      }
      else if (data.option === "View all Roles") {
        return viewallRole();
      }
      else if (data.option === "View all Employees") {
        return viewEmployees();
      }
      else if (data.option === "Add a Department") {

        return addDepartment();
      }

    })
}

init();



function viewallDepartment() {
  // Query database
  db.query('SELECT * FROM department', function (err, results) {
    console.log("------------------------");
    console.log(results);

    console.log("------------------------");
  });
}


function viewallRole() {
  db.query(' select role.id,role.title,role.salary,department.dept_name from role join department on role.department_id=department.department_id ', function (err, results) {
    if (err) throw err;
    console.log(results);
  });
}

function viewEmployees() {
  db.query('select employee.id,employee.first_name,employee.last_name,role.title,department.dept_name,role.salary,employee.manager_id from employee inner join role on employee.role_id=role.id inner join department on role.department_id=department.department_id', function (err, results) {
    if (err) throw err;
    console.log(results);
  });
}

function addDepartment() 
{
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'enter a department name',
    }
  ])
  .then(data => 
    {
    console.log(data);
    let dpartment = data.department;
    console.log(dpartment + ' added');
    //db.query(`Insert into department set dept_name ? `, dpartment);
    let sql =`Insert into department(dept_name) values(?) `;
    // db.query(`Insert into department set dept_name ? `, dpartment,function(err,results){
    db.query(sql,dpartment, function (err, results) 
    {
      if (err) throw err;
      //console.log(results);

      viewallDepartment();
    });


  })
}

