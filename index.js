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



function init(){
  inquirer.prompt(options)
  .then(data =>{
    console.log(data);
    if(data.option==="View all Departments"){
      console.log(data.option);
      return viewallDepartment();
    }
else if(data.option==="View all Roles"){
  return viewallRole();
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
