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

    const coachId = new URL(location.href).searchParams.get('coachId');

    console.log(`Coach ID: ${coachId}`);

    const sql = `SELECT * FROM tblCoach WHERE coachId = '${coachId}' LIMIT 1;`;

    console.log(`SQL Query: ${sql}`);

    runQuery(sql).then(result => {
        if (!result || !result.success) {
            console.log("Failed to find coach.");
            return;
        }  

        console.log("Found coach data!");
        const coach = result.data[0];

        document.getElementById("coachForename").value = coach.coachForename;
        document.getElementById("coachSurname").value = coach.coachSurname;
        document.getElementById("coachEmail").value = coach.coachEmail;
        document.getElementById("coachPhone").value = coach.coachPhone;
        document.getElementById("coachSpecialisation").value = coach.coachSpecialisation;

    });

    document.getElementById("coachForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        console.log("Form submitted!");

        const coachForename = document.getElementById("coachForename").value.trim();   
        const coachSurname = document.getElementById("coachSurname").value.trim();
        const coachEmail = document.getElementById("coachEmail").value.trim();
        const coachPhone = document.getElementById("coachPhone").value.trim();
        const coachSpecialisation = document.getElementById("coachSpecialisation").value.trim();


        console.log(`Form Data: ${coachForename}, ${coachSurname}, ${coachEmail}, ${coachPhone}, ${coachSpecialisation}`);
        
        const sql = `UPDATE tblCoach SET coachForename = '${coachForename}', coachSurname = '${coachSurname}', coachEmail = '${coachEmail}', coachPhone = '${coachPhone}', coachSpecialisation = '${coachSpecialisation}' WHERE coachId = ${coachId} LIMIT 1;`;

        runQuery(sql).then(result => {
            if (!result || !result.success) {
                console.log("Failed to update coach.");
                return;
            }
            console.log("Coach updated successfully!");
            document.location.href = "../HTML/coach.html";
        });

        console.log(`SQL Query: ${sql}`);
    });

});