INSERT INTO department (id,dept_name)
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


       INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Vinoth","Venkatesan",1,1),
       ("Jon","Gaston",2,1),
      ("Evelyn","James",3,2),
       ("Eva","Robert",4,2),
       ("Maya","Dev",5,2),
       ("Dave","Thomas",6,2),
       ("Jermy","paul",7,1),
       ("Stefan","Matt",8,1);

       