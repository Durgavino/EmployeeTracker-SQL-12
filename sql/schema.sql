DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;
USE employeetracker_db;
CREATE TABLE department (
  department_id INT PRIMARY KEY,
  dept_name VARCHAR(30)
);
CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary decimal,
    department_id INT,
    foreign key (department_id) references department (department_id)
);
CREATE TABLE employee(
id int primary key auto_increment,
      first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT not null,
    manager_id INT
);

INSERT INTO department (department_id,dept_name)
VALUES (1, "Sales"),
       (2, "Engineer"),
       (3, "Accounts"),
       (4, "HR"),
       (5,"Training");
       
         INSERT INTO role (id,title,salary,department_id)
VALUES (1, "Sales Lead",5000,1),
       (2, "Sales Person",3000,1),
       (3, "Account Manager",6000,3),
       (4, "Accountant",2000,3),
       (5, "Employee HR",5000,4),
       (6,"Trainer",4000,5),
       (7,"Senior Engineer",6000,2),
       (8,"Junior Engineer",3000,2);
       
       
         INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES (1,"Vinoth","Venkatesan",1,1),
       (2,"Jon","Gaston",2,1),
      (3,"Evelyn","James",3,2),
       (4,"Eva","Robert",4,2),
       (5,"Maya","Dev",5,2),
       (6,"Dave","Thomas",6,2),
       (7,"Jermy","paul",7,1),
       (8,"Stefan","Matt",8,1);
       
       
       select * from department;
       select * from role;
select * from employee;

show databases;
 
 alter table role add foreign key (department_id) references department(department_id);
 
 select role.id,role.title,role.salary,department.dept_name
 from role
 join department
 on role.department_id=department.department_id;
 
 drop table role;
 
 show databases;