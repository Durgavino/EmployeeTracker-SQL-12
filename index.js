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
      else if (data.option === "Add a Role") {
        return addRole();
      }
    })
}

init();



function viewallDepartment() {
  // Query database
  db.query('SELECT * FROM department', function (err, results) {
    console.log("------------------------");
    //console.log(results);
    console.table(results)
    console.log("------------------------");
    init();
  });
}



function viewallRole() {
  db.query(' select role.id as Role_ID,role.title as Role_Title,role.salary as Salary,department.dept_name as Dept_name from role join department on role.department_id=department.department_id ', function (err, results) {
    if (err) throw err;
    // console.log(results);
    console.table(results);
    init();
  });
}

function viewEmployees() {
  db.query('select employee.id,employee.first_name,employee.last_name,role.title,department.dept_name,role.salary,employee.manager_id from employee inner join role on employee.role_id=role.id inner join department on role.department_id=department.department_id', function (err, results) {
    if (err) throw err;
    //console.log(results);
    console.table(results);
    init();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'enter a department name',
    }
  ])
    .then(data => {
      console.log(data);
      let dpartment = data.department;
      console.log(dpartment + ' added');
      //db.query(`Insert into department set dept_name ? `, dpartment);
      let sql = `Insert into department(dept_name) values(?) `;
      // db.query(`Insert into department set dept_name ? `, dpartment,function(err,results){
      db.query(sql, dpartment, function (err, results) {
        if (err) throw err;
        //console.log(results);
        console.table(results);
        viewallDepartment();
        init();
      });


    })
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'roles',
      message: "Enter the Name of the Role :"
    },
    {
      type: 'input',
      name: 'salaries',
      message: "What is the Salary of the Role :"
    },
    {
      type: 'list',
      name: 'deptroles',
      message: "Which Department does the Role belong to ?",
      //choices: ["Sales", "Engineer", "Accounts", "HR", "Training", "code"]
      choices:[
        {
         name:"Sales",
         value:1
        },
        {
         name:"Engineer",
         value:2
        },
        {
         name:"Accounts",
         value:3
        },
        {
          name:"HR",
          value:4
         },
         {
          name:"Training",
          value:5
         },
         {
          name:"code",
          value:6
         }
       ]
    }
  ])
    .then(data => {
      console.log(data);
      let rolename = data.roles;
      let sal = data.salaries;
      let deptrole = data.deptroles;

      //let sql = `Insert into role(title,salary,department_id) values (?)`;
      // let sql = `Insert into role(title),role(salary),role(department_id) values (?)`;
      //let sql = `Insert into role(title,salary,department_id) set (?)`;
      let sql = `Insert into role(title,salary,department_id) set (?,?,?)`;
      let total = [rolename, sal, deptrole];
      // db.query(sql, [rolename, sal, deptrole], function (err, results) {
      db.query(sql, total, function (err, results) {
        if (err) throw err;
        console.table(results);
        viewallRole();
        init();
      })
    })
}