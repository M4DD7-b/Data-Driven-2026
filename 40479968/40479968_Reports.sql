DROP VIEW IF EXISTS vwMedicalCondition;
DROP VIEW IF EXISTS vwOlderMembers;
DROP VIEW IF EXISTS vwSpecialisationNumber;

-- Report Title: List of members with medical conditions
-- Business Question: How many members with a medical condition are registered at the fitness centre?
-- Why this report is useful: Allows for the identification of members in the target group and see if measures need to be taken to ensure the gyms are more accessible to further encourage participation
-- Tables used: Tabular report
CREATE VIEW vwMedicalCondition AS
SELECT mb.memberID, 
    CONCAT(mb.memberForename, ' ', mb.memberSurname) AS fullName, 
    ms.memberCondition 
FROM tblMeasurement AS ms 
LEFT JOIN tblMember AS mb 
ON ms.memberId=mb.memberId 
WHERE ms.memberCondition IS NOT NULL 
ORDER BY mb.memberSurname;

-- Report Title: List of members over forty
-- Business Question: How many members over forty are registered at the fitness centre?
-- Why this report is useful: Allows for the identification of members in the target group to see the community reach towards older members in the community
-- Tables used: Tabular report
CREATE VIEW vwOlderMembers AS
SELECT CONCAT(mb.memberForename, ' ', mb.memberSurname) AS fullName,
    mb.memberDOB, 
    ROUND(DATEDIFF(CURDATE(),
    mb.memberDOB)/365) AS memberAge 
FROM tblMember AS mb
HAVING memberAge >= 40 
ORDER BY mb.memberSurname;

-- Report Title: Number of different coach specialisations at each centre
-- Business Question: What is the variety of coach specialisations at each fitness centre?
-- Why this report is useful: Shows the options of specialist coaches at each fitness centre, and identifies where there is a lack of variety for members
-- Tables used: Tabular report and bar chart
CREATE VIEW vwSpecialisationNumber AS
SELECT cn.centreName, 
    cn.city, 
    COUNT(DISTINCT co.coachSpecialisation) AS numSpecialisation 
FROM tblcoachcentre AS cc 
INNER JOIN tblcoach AS co 
ON cc.coachId=co.coachId 
INNER JOIN tblcentre AS cn 
ON cc.centreId=cn.centreId 
GROUP BY cc.centreID, 
    cn.city 
ORDER BY cn.centreName;