DROP VIEW IF EXISTS vwUnderTwenty;
DROP VIEW IF EXISTS vwTwentyThirty;
DROP VIEW IF EXISTS vwThirtyForty;
DROP VIEW IF EXISTS vwFortyFifty;
DROP VIEW IF EXISTS vwFiftyPlus;
DROP VIEW IF EXISTS vwMemberCentre;
DROP VIEW IF EXISTS vwClassTurnout;
DROP VIEW IF EXISTS vwCoachClass;

-- faolán_report3
-- under 20
CREATE VIEW vwUnderTwenty AS
SELECT AVG(DATEDIFF(CURDATE(),
    member.membershipStartDate)) AS average 
FROM tblmember AS member 
WHERE DATEDIFF(CURDATE(), 
member.memberDOB) < 7306;
-- 20 - 30
CREATE VIEW vwTwentyThirty AS
SELECT AVG(DATEDIFF(CURDATE(),
    member.membershipStartDate))  
FROM tblmember AS member 
WHERE DATEDIFF(CURDATE(), member.memberDOB) >= 7306 
&& DATEDIFF(CURDATE(), member.memberDOB) < 10958;
-- 30 - 40
CREATE VIEW vwThirtyForty AS
SELECT AVG(DATEDIFF(CURDATE(),
    member.membershipStartDate))  
FROM tblmember AS member 
WHERE DATEDIFF(CURDATE(), member.memberDOB) >= 10958 
&& DATEDIFF(CURDATE(), member.memberDOB) < 14610;
-- 40 - 50
CREATE VIEW vwFortyFifty AS
SELECT AVG(DATEDIFF(CURDATE(),
    member.membershipStartDate))  
FROM tblmember AS member 
WHERE DATEDIFF(CURDATE(), member.memberDOB) >= 14610 
&& DATEDIFF(CURDATE(), member.memberDOB) < 18263;
-- 50+
CREATE VIEW vwFiftyPlus AS
SELECT AVG(DATEDIFF(CURDATE(),
    member.membershipStartDate))  
FROM tblmember AS member 
WHERE DATEDIFF(CURDATE(), 
member.memberDOB) >= 18263;

-- hana_report2
CREATE VIEW vwMemberCentre AS
SELECT c.centreName, 
    COUNT(m.memberID) AS total_members 
FROM tblCentre c  
LEFT JOIN tblMember m  
ON c.centreID = m.homeCentreId 
GROUP BY c.centreName 
ORDER BY total_members DESC;

-- maddy_report1
CREATE VIEW vwClassTurnout AS
SELECT c.classCategory, 
    COUNT(r.memberId) AS reservedMembers 
FROM tblClass c 
LEFT JOIN tblReservation r 
ON c.classId = r.classId 
GROUP BY c.classCategory 
ORDER BY reservedMembers DESC;

-- mark_report1
CREATE VIEW vwCoachClass AS
SELECT c.coachId, 
    CONCAT(c.coachForename, ' ', c.coachSurname) as 'coachName', 
    COUNT(cl.classId) AS entryCount 
FROM tblcoach c 
LEFT JOIN tblclass cl 
ON c.coachId = cl.coachId 
GROUP BY c.coachId;