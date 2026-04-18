/* INDIVIDUAL REPORTS FOR MEMBER 40483710
  * This file contains SQL queries to generate individual reports for member 40483710.
*/

-- 1. Query to retrieve the classes with the lowest turnout:
/* This query includes the class name, the coach running the class,
* and the number of enrolled members.
*/
SELECT
  c.className,
  SUM(COALESCE(r.memberId IS NOT NULL,0)) AS reservedMembers -- or COUNT(r.memberId)
FROM tblClass c
LEFT JOIN tblReservation r ON c.classId = r.classId
GROUP BY c.className
ORDER BY reservedMembers DESC;

-- 2. Query to calculate the greatest mass difference of members during this year:
SELECT
  m.memberId,
  m.memberForename,
  m.memberSurname,
  MAX(me.memberCurrentMuscleMass) - MIN(me.memberStartMuscleMass) AS massDifference
FROM tblMember m
JOIN tblMeasurement me ON m.memberId = me.memberId
WHERE YEAR(m.membershipStartDate) = YEAR(CURDATE())
GROUP BY m.memberId
ORDER BY massDifference ASC
LIMIT 10;

-- 3. Query to calculate the average weight of members with health conditions versus those without a health condition:
SELECT
  CASE
    WHEN memberCondition IS NOT NULL THEN 'With Condition'
    ELSE 'Without Condition'
  END AS conditionStatus,
  AVG(memberCurrentWeight) AS averageWeight
FROM tblMember m
JOIN tblMeasurement me ON m.memberId = me.memberId
GROUP BY conditionStatus;