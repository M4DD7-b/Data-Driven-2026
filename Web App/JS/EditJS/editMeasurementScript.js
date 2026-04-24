// Send an SQL query to dbConnector.php and return the JSON response.
const runQuery = async (sql) => {
    try {
    // This is the PHP endpoint that talks to the database for us.
    const url = "https://mbrum01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";

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

    const measurementId = new URL(location.href).searchParams.get('measurementId');

    console.log(`Measurement ID: ${measurementId}`);

    const sql = `SELECT * FROM tblMeasurement WHERE measurementId = '${measurementId}' LIMIT 1;`;

    console.log(`SQL Query: ${sql}`);

    runQuery(sql).then(result => {
        if (!result || !result.success) {
            console.log("Failed to find measurement.");
            return;
        }  

        console.log("Found measurement data!");
        const session = result.data[0];

        document.getElementById("memberStartWeight").value = session.memberStartWeight;
        document.getElementById("memberCurrentWeight").value = session.memberCurrentWeight;
        document.getElementById("memberStartMuscleMass").value = session.memberStartMuscleMass;
        document.getElementById("memberCondition").value = session.memberCondition;

    });

    document.getElementById("measurementForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        console.log("Form submitted!");

        const memberStartWeight = document.getElementById("memberStartWeight").value.trim();
        const memberCurrentWeight = document.getElementById("memberCurrentWeight").value.trim();
        const memberStartMuscleMass = document.getElementById("memberStartMuscleMass").value.trim();
        const memberCondition = document.getElementById("memberCondition").value.trim();


        console.log(`Form Data: ${memberStartWeight}, ${memberCurrentWeight}, ${memberStartMuscleMass}, ${memberCondition}`);
        
        const sql = `UPDATE tblMeasurement SET memberStartWeight = '${memberStartWeight}', memberCurrentWeight = '${memberCurrentWeight}', memberStartMuscleMass = '${memberStartMuscleMass}', memberCondition = '${memberCondition}' WHERE measurementId = ${measurementId} LIMIT 1;`;

        runQuery(sql).then(result => {
            if (!result || !result.success) {
                console.log("Failed to update measurement.");
                return;
            }
            console.log("Measurement updated successfully!");
            document.location.href = "../HTML/measurement.html";
        });

        console.log(`SQL Query: ${sql}`);
    });

});