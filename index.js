const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const path = require('path');

// Connect to database
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
if("View all Departments"==="View all Departments"){
  return viewallDepartment();
}
    })
}

init();

function viewallDepartment(){
  // Query database
db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});
}









// db.query('SELECT * FROM role', function (err, results) {
//   console.log(results);
// });

// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(results);
// });



// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
