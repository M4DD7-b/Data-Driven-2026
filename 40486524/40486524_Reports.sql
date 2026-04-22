-- REPORT 1
-- Report Title: Most Popular Class Time Slots

-- Business Question: Which class time slots are the most popular across all centres?

-- Why this report is useful?:
-- This report displays information about peak hours and off-peak hours for each class in all centres.
-- This will assest management in allocating more sessions when the load is high 
-- and evaluating the off-peak hours, leading to better utilisation of resources.

-- Tables Used: tblClass, tblReservation

SELECT
     c.classStartTime, 
     COUNT(r.memberID) AS total_attendance 
FROM tblClass c 
LEFT JOIN tblReservation r 
    ON c.classID = r.classID 
GROUP BY c.classStartTime 
ORDER BY total_attendance DESC;

-- REPORT 2 
-- Report Title: Member Distribution Across Centres 

-- Business Qustion: Which centres have the highest number of members assigned to them?

-- Why this report is useful?:
-- Analysing how many members each centre holds offers valuable knowledge about the differences in demand among various centres.
-- Such analysis may prove beneficial in making sound strategies related to staffing and resource management.

-- Tables Used: tblCentre, tblMmeber

SELECT c.centreName, 
    COUNT(m.memberID) AS total_members 
FROM tblCentre c  
LEFT JOIN tblMember m  
    ON c.centreID = m.homeCentreId 
GROUP BY c.centreName 
ORDER BY total_members DESC;


-- REPORT 3
-- Reprt Title: Member Class Attendance 

-- Business Question: How many classes is each member attending?

-- Why this report is useful?:
-- Evaluating individual attendance patterns allows for the assessment of member engagement levels. 
-- This supports the identification of both highly active and less engaged mebers,
-- enabling targeted strategies toimprove participation and retention.

-- Tables Used: tblMember, tblReservation

SELECT  m.memberID,
    CONCAT(m.memberForename, ' ', m.memberSurname) AS fullName,
    COUNT(r.classID) AS total_classes 
FROM tblMember m 
LEFT JOIN tblReservation r 
    ON m.memberID = r.memberID 
GROUP BY m.memberID, fullName 
ORDER BY total_classes DESC;

