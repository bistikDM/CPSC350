CREATE DATABASE workshop1;
\c workshop1

CREATE TABLE workshop
(
	attendees VARCHAR(50),
	workshops VARCHAR(50)
);

INSERT INTO workshop VALUES 
('Ahmed Abdelali', 'DevOps101'),
('Ann Frank', 'Docker Container Fundamentals'),
('Ann Mulkern', 'Machine Learning'),
('Clara Weick', 'Modern Javascript'),
('James Archer', 'MongoDB'),
('Linda Park', 'React Fundamentals'),
('Lucy Smith', 'Self-Driving Cars');