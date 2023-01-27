const inquirer=require('inquirer');
const mysql=require('mysql2');
const consoleTable = require('console.table');
const path=require('path');



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