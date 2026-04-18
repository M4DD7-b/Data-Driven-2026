document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/dbConnector.php";
        const myChart = document.querySelector("#myChart");

        const sql =
        "SELECT c.className, CONCAT(co.firstName, ' ', co.lastName) AS coachName, COUNT(e.memberId) AS enrolledMembers, ROUND(AVG(a.attendanceRate), 2) AS averageAttendanceRate FROM tblClass c JOIN tblCoach co ON c.coachId = co.coachId LEFT JOIN tblEnrollment e ON c.classId = e.classId LEFT JOIN tblAttendance a ON e.enrollmentId = a.enrollmentId GROUP BY c.classId ORDER BY averageAttendanceRate ASC LIMIT 5;";

        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams({
                query: sql
            })
        });

        const result = await response.json();

    if (!result || !result.success || result.data.length === 0) {
        myChart.textContent = "No data found.";
        return;
    }
    
    const ctx = document.querySelector("#myChart");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: result.data.map(row => row.className),
            datasets: [
                {
                    label: "Average Attendance Rate",
                    data: result.data.map(row => row.averageAttendanceRate),
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }
            ]
        }
    });
});