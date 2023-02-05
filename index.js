
// Required Packages
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
      else if (data.option === "Add an Employee") {
        return addEmployee();
      }
      else if (data.option === "Update an Employee Role") {
        return updateEmployee();
       
      }

    })
}

init();


// View all department from the sql 
function viewallDepartment() {
  // Query database
  db.query('SELECT * FROM department', function (err, results) {
    console.log("------------------------");
    //console.log(results);
    console.table(results);
   
    console.log("------------------------");
    init();
  });
}


// View all Role from the sql 
function viewallRole() {
  db.query(' select role.id as Role_ID,role.title as Role_Title,role.salary as Salary,department.dept_name as Dept_name from role join department on role.department_id=department.department_id ', function (err, results) {
    if (err) throw err;
    // console.log(results);
    console.table(results);
    init();
  });
}

// View all Employee from the sql 
function viewEmployees() {
  db.query('select employee.id,employee.first_name,employee.last_name,role.title,department.dept_name,role.salary,employee.manager_id from employee inner join role on employee.role_id=role.id inner join department on role.department_id=department.department_id', function (err, results) {
    if (err) throw err;
    //console.log(results);
    console.table(results);
    init();
  });
}

// function to add department to the sql table 
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

// function to add Role to the sql table 
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
      choices: [
        {
          name: "Sales",
          value: 1
        },
        {
          name: "Engineer",
          value: 2
        },
        {
          name: "Accounts",
          value: 3
        },
        {
          name: "HR",
          value: 4
        },
        {
          name: "Training",
          value: 5
        },
        {
          name: "code",
          value: 6
        }
      ]
    }
  ])
    .then(data => {
      console.log(data);
      let rolename = data.roles;
      //let sal = data.salaries;
      let sal = parseInt(data.salaries);
      let deptrole = data.deptroles;

      // let sql = `Insert into role(title,salary,dept_name) set (?, ?, ?)`;
      let sql = `Insert into role(title,salary,department_id) values (?,?,?)`;
      let total = [rolename, sal, deptrole];
      // db.query(sql, [rolename, sal, deptrole], function (err, results) {
      db.query(sql, total, function (err, results) {
        if (err) throw err;

        //console.table(results);
        viewallRole();

      })
      init();

    })
}


// function to add employee to the sql table 
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'EFirstname',
      message: "Enter the Employee's First-Name :"
    },
    {
      type: 'input',
      name: 'ELastname',
      message: "Enter the Employee's Last-Name :"
    },
    {
      type: 'list',
      name: 'Erole',
      message: "Select the Employee's Role:",
      choices: [
        {
          name: "sales Lead",
          value: 1
        },
        {
          name: "Sales Person",
          value: 2
        },
        {
          name: "Account Manager",
          value: 3
        },
        {
          name: "Accountant",
          value: 4
        },
        {
          name: "Employee HR",
          value: 5
        },
        {
          name: "Trainer",
          value: 6
        },
        {
          name: "Senior Engineer",
          value: 7
        },
        {
          name: "Junior Engineer",
          value: 8
        }

      ]
    },
    {
      type: 'list',
      name: 'Emanager',
      message: "Select the Employee's Manager Name :",
      choices: [
        {
          name: "Vinoth Venkatesan",
          value: 1
        },
        {
          name: "Evelyn James",
          value: 2
        },
        {
          name: "Jon Javier",
          value: 3
        }
      ]
    }
  ])
    .then(data => {
      let Fname = data.EFirstname;
      let Lname = data.ELastname;
      let Erole = data.Erole;
      let Emanager = data.Emanager;

      let sql = `Insert into employee (first_name,last_name,role_id,manager_id) values (?,?,?,?)`;

      let total = [Fname, Lname, Erole, Emanager];

      db.query(sql, total, function (err, results) {
        if (err) throw err;
        viewEmployees();
      })
      init();

    })

}


// function updateEmployee() {

//  let enames=`select employee.first_name,employee.last_name from employee`;

//   inquirer.prompt([
//     {
//       type: 'list',
//       name: 'selectemploy',
//       message: "Which Employee's role do you want to update:",
//       choices:[enames]
//     },
//     {
//       type: 'list',
//       name: 'changeroles',
//       message: "Which role do you want to assign the selected Employee:",
//       choices: [
//         {
//           name: "sales Lead",
//           value: 1
//         },
//         {
//           name: "Sales Person",
//           value: 2
//         },
//         {
//           name: "Account Manager",
//           value: 3
//         },
//         {
//           name: "Accountant",
//           value: 4
//         },
//         {
//           name: "Employee HR",
//           value: 5
//         },
//         {
//           name: "Trainer",
//           value: 6
//         },
//         {
//           name: "Senior Engineer",
//           value: 7
//         },
//         {
//           name: "Junior Engineer",
//           value: 8
//         }
//       ]
//     }
//   ])
//     .then(data => {
//      let selectemploy=data.selectemploy;
//       let changeroles = data.changeroles;
//       let total=[selectemploy,changeroles]
//       let sql = `update employee(first_name,last_name role_id) set (?,?,?)`;
//       db.query(sql, total, function (err, results) {
//         if (err) throw err;

//       })

//     })

// }


function updateEmployee() {

const ename=[];

  inquirer.prompt([
    {
      type: 'list',
      name: 'selectemploy',
      message: "Which Employee's role do you want to update:",
      choices:[ename]
      
    },
    {
      type: 'list',
      name: 'changeroles',
      message: "Which role do you want to assign the selected Employee:",
      choices: [
        {
          name: "sales Lead",
          value: 1
        },
        {
          name: "Sales Person",
          value: 2
        },
        {
          name: "Account Manager",
          value: 3
        },
        {
          name: "Accountant",
          value: 4
        },
        {
          name: "Employee HR",
          value: 5
        },
        {
          name: "Trainer",
          value: 6
        },
        {
          name: "Senior Engineer",
          value: 7
        },
        {
          name: "Junior Engineer",
          value: 8
        }
      ]
    }
  ])
    .then(data => {
     let selectemploy=data.selectemploy;
      let changeroles = data.changeroles;
      let total=[selectemploy,changeroles]
      let sql = `update employee(first_name,last_name role_id) set (?,?,?)`;
      db.query(sql, total, function (err, results) {
        if (err) throw err;
        console.log(results);

      })

    })

}