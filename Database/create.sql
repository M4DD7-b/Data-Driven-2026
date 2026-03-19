DROP TABLE IF EXISTS tblCoachCentre;
DROP TABLE IF EXISTS tblReservation;
DROP TABLE IF EXISTS tblCoach;
DROP TABLE IF EXISTS tblMember;
DROP TABLE IF EXISTS tblClass;
DROP TABLE IF EXISTS tblCentre;

CREATE TABLE tblCentre (
    centreId INT(8) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    centreName VARCHAR(100) NOT NULL UNIQUE,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(60) NOT NULL,
    unitNo VARCHAR(10) NOT NULL,
    postcode VARCHAR(8) NOT NULL
);

CREATE TABLE tblCoach (
    coachId INT(8) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    coachForename VARCHAR(50) NOT NULL,
    coachSurname VARCHAR(50) NOT NULL,
    coachEmail VARCHAR(100) NOT NULL UNIQUE,
    coachPhone VARCHAR(20) NOT NULL,
    coachSpecialisation VARCHAR(100) NOT NULL
);

CREATE TABLE tblCoachCentre (
    coachId INT(8),
    centreId INT(8),
    FOREIGN KEY (coachId) REFERENCES tblCoach(coachId),
    FOREIGN KEY (centreId) REFERENCES tblCentre(centreId)
);

CREATE TABLE tblMember (
    homeCentreId INT(8),
    memberId INT(8) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    memberForename VARCHAR(50) NOT NULL,
    memberSurname VARCHAR(50) NOT NULL,
    memberEmail VARCHAR(100) NOT NULL UNIQUE,
    memberPhone VARCHAR(20) NOT NULL,
    memberDOB DATETIME NOT NULL,
    membershipType VARCHAR(10) NOT NULL CHECK (membershipType IN ('All', 'SGPT', 'HIIT&Hyrox', 'Boxing')),
    membershipStartDate DATETIME NOT NULL,
    memberStartWeight DECIMAL(3, 2) NOT NULL,
    memberCurrentWeight DECIMAL(3, 2) DEFAULT NULL,
    memberStartMuscleMass DECIMAL(2, 2) NOT NULL,
    memberCurrentMuscleMass DECIMAL(2, 2) DEFAULT NULL,
    memberCondition VARCHAR(100) DEFAULT NULL,
    FOREIGN KEY (homeCentreId) REFERENCES tblCentre(centreId)
);

CREATE TABLE tblClass (
    centreId INT(8),
    classId INT(8) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    className VARCHAR(100) NOT NULL,
    classCategory VARCHAR(50) NOT NULL CHECK (classCategory IN ('SGPT', 'HIIT', 'Boxing', 'Hyrox')),
    classDate DATE NOT NULL, /*UPDATE THIS TO THE DATABASE*/
    classStartTime TIME NOT NULL,
    classEndTime TIME NOT NULL,
    FOREIGN KEY (centreId) REFERENCES tblCentre(centreId)
);

CREATE TABLE tblReservation (
    classId INT(8),
    memberId INT(8),
    FOREIGN KEY (classId) REFERENCES tblClass(classId),
    FOREIGN KEY (memberId) REFERENCES tblMember(memberId)
);