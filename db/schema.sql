DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;
USE employeetracker_db;


-- Department Table
CREATE TABLE department (
  department_id INT PRIMARY KEY auto_increment,
  dept_name VARCHAR(30)
);

--Role Table
CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary decimal,
    department_id INT,
    foreign key (department_id) references department (department_id)
);

---Empployee Table
CREATE TABLE employee(
id int primary key auto_increment,
      first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT not null,
    manager_id INT
);

