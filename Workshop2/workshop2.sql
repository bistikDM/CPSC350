CREATE DATABASE workshop2;
\c workshop2

CREATE TABLE user_database
(
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    PRIMARY KEY(user_name)
);

CREATE TABLE workshop_database
(
    workshop_id serial INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    start_date DATE,
    location VARCHAR(25),
    max_seats INT,
    instructor_id INT,
    CONSTRAINT instructor_database_instructor_id_fk FOREIGN KEY(instructor_id) REFERENCES instructor_database(instructor_id),
    PRIMARY KEY(workshop_id)
);

CREATE TABLE instructor_database
(
    instructor_id serial INT NOT NULL,
    instructor VARCHAR(50),
    PRIMARY KEY(instructor_id)
);

CREATE TABLE enrollment_database
(
    workshop_id INT,
    user_name VARCHAR(50),
    CONSTRAINT workshop_database_workshop_id_fk FOREIGN KEY(workshop_id) REFERENCES workshop_database(workshop_id),
    CONSTRAINT user_database_user_name_fk FOREIGN KEY(user_name) REFERENCES user_database(user_name)
);

CREATE ROLE workshop2 WITH LOGIN;
GRANT SELECT, INSERT, DELETE ON user_database, workshop_database, instructor_database, enrollment TO workshop2;
\password workshop2