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
      database: ''
    },
    console.log(`Connected to the classlist_db database.`)
  );