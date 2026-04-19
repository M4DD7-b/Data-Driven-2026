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

    const centreId = new URL(location.href).searchParams.get('centreId');
    const coachId = new URL(location.href).searchParams.get('coachId');

    console.log(`Centre ID: ${coachId}`);
    console.log(`Coach ID: ${coachId}`);

    const sql = `SELECT * FROM tblCoach WHERE centreId = '${centreId}' && coachId = '${coachId}' LIMIT 1;`;

    console.log(`SQL Query: ${sql}`);

    runQuery(sql).then(result => {
        if (!result || !result.success) {
            console.log("Failed to find assignment.");
            return;
        }  

        console.log("Found assignment data!");
        const assignment = result.data[0];

        document.getElementById("centreId").value = assignment.centreId;
        document.getElementById("coachId").value = assignment.coachId;

    });

    document.getElementById("assignmentForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        console.log("Form submitted!");

        const centreId = document.getElementById("centreId").value.trim();   
        const coachId = document.getElementById("coachId").value.trim();

        console.log(`Form Data: ${centreId}, ${coachId}`);
        
        const sql = `UPDATE tblCoachCentre SET centreId = '${centreId}', coachId = '${coachId}'WHERE centreId =  ${centreId} && coachId = ${coachId} LIMIT 1;`;

        runQuery(sql).then(result => {
            if (!result || !result.success) {
                console.log("Failed to update assignment.");
                return;
            }
            console.log("Assignment updated successfully!");
            document.location.href = "../HTML/coachCentre.html";
        });

        console.log(`SQL Query: ${sql}`);
    });

});