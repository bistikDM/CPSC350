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
    title VARCHAR(50) NOT NULL,
    start_date DATE,
    location VARCHAR(25),
    max_seats INT,
    instructor VARCHAR(50),
    PRIMARY KEY(title)
);

CREATE TABLE enrollment
(
    id SERIAL NOT NULL,
    title VARCHAR(50),
    user_name VARCHAR(50),
    CONSTRAINT workshop_database_title_fk,
    FOREIGN KEY(title),
    REFERENCES workshop_database(title),
    PRIMARY KEY(id)
);

CREATE ROLE workshop2 WITH LOGIN;
GRANT SELECT, INSERT, DELETE ON user_database, workshop_database, enrollment TO workshop2;
\password workshop2