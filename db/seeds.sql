INSERT INTO departments (title)
    VALUES 
         ("Engineering"),
         ("Finance"),
         ("Legal"),
         ("Sales");

INSERT INTO roles (dept_id, title, salary)
    VALUES
        (4, "Sales Lead", 100000),
        (4, "Salesperson", 80000),
        (1, "Lead Engineer", 150000), 
        (1, "Software Engineer", 120000), 
        (2, "Account Manager", 160000),
        (2, "Accountant", 1250000),
        (3, "Legal Team Lead", 250000),
        (3, "Lawyer", 190000);

INSERT INTO employees (role_id, manager_id, first_name, last_name)
    VALUES
        (1, null, "John", "Doe"),
        (2, 1, "Mike", "Chan"),
        (3, null, "Ashley", "Rodriguez"),
        (4, 3, "Faris", "Hawk"),
        (5, null, "Elina", "Arzum"),
        (6, 5, "Dalia", "Kitten"),
        (7, null, "Danah", "Khan"),
        (8, 7, "Mariem", "Robel");