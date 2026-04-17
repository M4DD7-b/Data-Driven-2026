/* INDIVIDUAL REPORTS FOR MEMBER 40483710
    * This file contains SQL queries to generate individual reports for member 40483710.
    */

-- 1. Query to retrieve the classes with the lowest turnout:
/* This query includes the class name, the coach running the class,
* the number of enrolled members, and the average attendance rate for each class.
*/
SELECT 
    c.className,
    CONCAT(co.firstName, ' ', co.lastName) AS coachName,
    COUNT(e.memberId) AS enrolledMembers,
    ROUND(AVG(a.attendanceRate), 2) AS averageAttendanceRate
FROM tblClass c
JOIN tblCoach co ON c.coachId = co.coachId
LEFT JOIN tblEnrollment e ON c.classId = e.classId
LEFT JOIN tblAttendance a ON e.enrollmentId = a.enrollmentId
GROUP BY c.classId
ORDER BY averageAttendanceRate ASC
LIMIT 5;