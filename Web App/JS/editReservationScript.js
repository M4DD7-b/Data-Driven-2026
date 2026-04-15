// Send an SQL query to dbConnector.php and return the JSON response.
const runQuery = async (sql) => {
    try {
    // This is the PHP endpoint that talks to the database for us.
    const url = "http://localhost/dbConnector.php";

    // Send the SQL statement in the body of a POST request.
    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({ query: sql })
    });

    // Stop and report a problem if the web request itself failed.
    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }

    // Convert the JSON text from PHP into a JavaScript object.
    const result = await response.json();
    return result;

    } catch (error) {
        // Log errors so they can be seen in the browser console during debugging.
        console.log(error.message);
    }
}

document.addEventListener("DOMContentLoaded", function() {

    const classId = new URL(location.href).searchParams.get('classId');
    const memberId = new URL(location.href).searchParams.get('memberId');

    console.log(`Class ID: ${classId}`);
    console.log(`Member ID: ${memberId}`);

    const sql = `SELECT * FROM tblReservation WHERE classId = '${classId}' && memberId = '${memberId}' LIMIT 1;`;

    console.log(`SQL Query: ${sql}`);

    runQuery(sql).then(result => {
        if (!result || !result.success) {
            console.log("Failed to find reservation.");
            return;
        }  

        console.log("Found reservation data!");
        const reservation = result.data[0];

        document.getElementById("classId").value = reservation.classId;
        document.getElementById("memberId").value = reservation.memberId;

    });

    document.getElementById("reservationForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        console.log("Form submitted!");

        const classId = document.getElementById("classId").value.trim();
        const memberId = document.getElementById("memberId").value.trim();

        console.log(`Form Data: ${classId}, ${memberId}`);
        
        const sql = `UPDATE tblReservation SET classId = '${classId}', memberId = '${memberId}' WHERE classId = ${classId} AND memberId = ${memberId} LIMIT 1;`;

        runQuery(sql).then(result => {
            if (!result || !result.success) {
                console.log("Failed to update reservation.");
                return;
            }
            console.log("Reservation updated successfully!");
            document.location.href = "../HTML/reservation.html";
        });

        console.log(`SQL Query: ${sql}`);
    });

});