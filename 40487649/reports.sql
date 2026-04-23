/* INDIVIDUAL REPORTS FOR MEMBER 40487649
  * This file contains SQL queries to generate individual reports for member 40487649.
*/

-- 1. Query to retrieve the number of classes each gym has:
SELECT 
c.centreId, c.centreName, COUNT(cl.classId) AS classCount 
FROM tblcentre c 
LEFT JOIN tblclass cl 
ON c.centreId = cl.centreId 
GROUP BY c.centreId;

-- 2. Query to calculate the length of membership for each member:
SELECT 
m.memberId, CONCAT(m.memberForename, ' ', m.memberSurname) as 'memberName', DATEDIFF(CURRENT_DATE, m.membershipStartDate) as 'membershipLength' 
FROM tblmember m;

-- 3. Query to calculate the number of classes each coach has:
SELECT
c.coachId, CONCAT(c.coachForename, ' ', c.coachSurname) as 'coachName', COUNT(cl.classId) AS entryCount
FROM tblclass cl
RIGHT JOIN tblcoach c ON c.coachId = cl.coachId
GROUP BY c.coachId;