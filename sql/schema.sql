DROP DATABASE IF EXISTS EmployeeTracker_db;
CREATE DATABASE EmployeeTracker_db;

USE EmployeeTracker_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary decimal,
    department_id INT
);

CREATE TABLE  employee(
    id INT  PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    
);