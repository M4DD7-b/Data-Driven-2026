DELETE FROM tblCoachCentre;
DELETE FROM tblReservation;
DELETE FROM tblCoach;
DELETE FROM tblMeasurement;
DELETE FROM tblMember;
DELETE FROM tblClass;
DELETE FROM tblCentre;

INSERT INTO tblCentre VALUES
    (1, 'Benchmark Fitness Belfast', 'Lisburn Road', 'Belfast', 'F1', 'BT95BW'),
    (2, 'Benchmark Fitness Lisburn', 'Main Street', 'Lisburn', '2', 'BT281AN'),
    (3, 'Benchmark Fitness Derry', 'Queen Street', 'Derry', 'G01', 'BT487EF'),
    (4, 'Benchmark Fitness Newry', 'High Street', 'Bangor', 'S4', 'BT205BD'),
    (5, 'Benchmark Fitness Armagh', 'Church Street', 'Armagh', '1', 'BT619AZ');

INSERT INTO tblCoach VALUES
    (1, 'John', 'McClure', 'john.mcclure@gmail.com', '07801 234567', 'Strength Training'),
    (2, 'Jane', 'O''Neill', 'jane.oneill@hotmail.com', '07801 234568', 'Nutrition Coaching'),
    (3, 'Emily', 'Campbell', 'emily.campbell@icloud.com', '07801 234569', 'Cardio Fitness'),
    (4, 'Mike', 'Magee', 'mike.magee@gmail.com', '07801 234570', 'Group Fitness'),
    (5, 'Sarah', 'Byrne', 'sarah.byrne@gmail.com', '07801 234571', 'Personal Training'),
    (6, 'Tom', 'McGuinness', 'tom.mcguinness@icloud.com', '07801 234572', 'Strength Training'),
    (7, 'Lisa', 'Ward', 'lisa.ward@hotmail.com', '07801 234573', 'Group Fitness'),
    (8, 'Rob', 'Thompson', 'rob.thompson@outlook.com', '07801 234574', 'Cardio Fitness');

INSERT INTO tblCoachCentre VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 2),
    (5, 2),
    (6, 3),
    (7, 3),
    (8, 4),
    (1, 5),
    (2, 5);

INSERT INTO tblMember VALUES
    (5, 1, 'Aidan', 'Ferguson', 'aidan.ferguson@example.com', '07801 123456', '1983-02-15', 'All', '2023-01-01'),
    (3, 2, 'Niamh', 'Doherty', 'niamh.doherty@example.com', '07801 123457', '1992-03-20', 'SGPT', '2022-06-01'),
    (2, 3, 'Connor', 'McBride', 'connor.mcbride@example.com', '07801 123458', '1995-04-30', 'HIIT&Hyrox', '2023-03-15'),
    (1, 4, 'Clodagh', 'Hughes', 'clodagh.hughes@example.com', '07801 123459', '1988-06-05', 'Boxing', '2022-09-10'),
    (4, 5, 'Ronan', 'Neill', 'ronan.neill@example.com', '07801 123460', '1990-08-22', 'All', '2023-02-01'),
    (5, 6, 'Sinead', 'Murray', 'sinead.murray@example.com', '07801 123461', '1994-05-14', 'SGPT', '2022-07-15'),
    (2, 7, 'Seamus', 'Boyle', 'seamus.boyle@example.com', '07801 123462', '1986-11-11', 'HIIT&Hyrox', '2023-05-10'),
    (2, 8, 'Fiona', 'Collins', 'fiona.collins@example.com', '07801 123463', '1991-02-21', 'Boxing', '2022-11-20'),
    (3, 9, 'Ethan', 'Graham', 'ethan.graham@example.com', '07801 123464', '1989-10-10', 'All', '2023-01-15'),
    (4, 10, 'Orla', 'McCarthy', 'orla.mccarthy@example.com', '07801 123465', '1996-07-12', 'SGPT', '2022-12-05');

INSERT INTO tblMeasurement VALUES
    (1, 76.54, 81.2, 75.2, 80.5, 'Heart Disease'),
    (2, 85.10, 89.40, 73.80, 78.50, 'Obesity'),
    (3, 91.25, 95.80, 82.50, 87.35, 'Asthma'),
    (4, 64.75, 68.20, 55.90, 59.10, NULL),
    (5, 78.60, 82.00, 68.30, 73.70, 'Diabetes'),
    (6, 74.90, 77.60, 63.00, 65.80, 'High Cholesterol'),
    (7, 100.12, 103.45, 90.00, 93.25, 'Osteoperosis'),
    (8, 79.30, 83.50, 70.10, 74.20, 'Scoliosis'),
    (9, 88.15, 91.80, 77.60, 81.40, NULL),
    (10, 96.45, 99.60, 84.50, 88.30, 'High Blood Pressure');

INSERT INTO tblClass VALUES
    (3, 1, 'Morning SGPT', 'SGPT', '2023-03-01', '09:00:00', '10:00:00'),
    (2, 2, 'Evening HIIT', 'HIIT', '2023-03-02', '18:00:00', '19:00:00'),
    (4, 3, 'Boxing Fundamentals', 'Boxing', '2023-03-03', '17:00:00', '18:00:00'),
    (5, 4, 'Hyrox Training', 'Hyrox', '2023-03-04', '11:00:00', '12:30:00'),
    (1, 5, 'Advanced SGPT', 'SGPT', '2023-03-05', '10:30:00', '11:30:00'),
    (2, 6, 'HIIT for Beginners', 'HIIT', '2023-03-06', '19:30:00', '20:30:00'),
    (3, 7, 'Boxing Conditioning', 'Boxing', '2023-03-07', '16:00:00', '17:00:00'),
    (4, 8, 'Hyrox Endurance', 'Hyrox', '2023-03-08', '12:00:00', '13:30:00'),
    (5, 9, 'Weekend SGPT', 'SGPT', '2023-03-09', '08:00:00', '09:00:00'),
    (1, 10, 'Boxing Sparring', 'Boxing', '2023-03-10', '17:30:00', '18:30:00');

INSERT INTO tblReservation VALUES
    (1, 10),
    (1, 2),
    (2, 8),
    (3, 7),
    (4, 3),
    (7, 1),
    (8, 4),
    (9, 5),
    (10, 6),
    (6, 1),
    (8, 2),
    (7, 8);