-- INDIVIDUAL REPORTS FOR MEMBER 40479966
-- This file contains SQL queries to generate individual reports for member 40479966.


-- 1. Query to retrieve details of centres and the amount of classes/coaches each has
-- Tables used - tblcentre, tblclass, tblcoachcentre
-- Business question - What are the details of the currently existing centres and how many classes and coaches does each on have access to
-- Why is this report useful - Tells us how much staff and avaliable content is at each centre and tells us if any need more resources/focus

SELECT 
	Centre.centreName, 
    concat(Centre.street,', ',Centre.city) AS centreLocation, 
    Centre.unitNo, 
    Centre.postcode,
    Class.totalClassId, 
    CoachCentre.totalCoachId 
FROM tblcentre AS Centre 
LEFT JOIN ( 
	SELECT 
		centreID, 
        Count(tblclass.classId) AS totalClassId 
	FROM tblclass 
    GROUP BY tblclass.centreId) AS Class 
ON Class.centreId = Centre.centreId 
JOIN (
	SELECT 
		centreId, 
        Count(tblcoachcentre.coachId) AS totalCoachId 
	FROM tblcoachcentre 
    GROUP BY tblcoachcentre.centreId) AS CoachCentre 
ON CoachCentre.centreId = Centre.centreId;


-- 2. Query to retrieve total registered members at each centre
-- Tables used - tblmember, tblcentre
-- Business question - How popular is each centre?
-- Why is this report useful - Tells the organisation which of their branches is performing the best and which could use more work
SELECT 
	tblcentre.centreName AS 'CentreName', 
    COUNT(x.homeCentreId) AS 'TotalMembers' 
FROM tblmember x 
JOIN tblcentre ON x.homeCentreId =tblcentre.centreID 
GROUP BY homeCentreId  
ORDER BY  COUNT('Total Members') DESC;

-- 3. Query to retrieve average time spent with organisation sorted by different age groups
-- Tables used - tblmember
-- Business question - How popular is the service among each age group?
-- Why is this report useful - Tells the organisation what it's target demographic is, allowing them to focus on appealing to them more
SELECT * FROM vwUnderTwenty UNION ALL 
SELECT * FROM vwTwentyThirty UNION ALL 
SELECT * FROM vwThirtyForty UNION ALL 
SELECT * FROM vwFortyFifty UNION ALL
SELECT * FROM vwFiftyPlus;


-- Views

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



