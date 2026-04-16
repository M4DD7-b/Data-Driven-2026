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

    console.log(`Class ID: ${classId}`);

    const sql = `SELECT * FROM tblClass WHERE classId = '${classId}' LIMIT 1;`;

    console.log(`SQL Query: ${sql}`);

    runQuery(sql).then(result => {
        if (!result || !result.success) {
            console.log("Failed to find class.");
            return;
        }  

        console.log("Found class data!");
        const session = result.data[0];

        document.getElementById("className").value = session.className;
        document.getElementById("classCategory").value = session.classCategory;
        document.getElementById("classDate").value = session.classDate;
        document.getElementById("classStartTime").value = session.classStartTime;
        document.getElementById("classEndTime").value = session.classEndTime;

    });

    document.getElementById("classForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        console.log("Form submitted!");

        const className = document.getElementById("className").value.trim();   
        const classCategory = document.getElementById("classCategory").value.trim();
        const classDate = document.getElementById("classDate").value.trim();
        const classStartTime = document.getElementById("classStartTime").value.trim();
        const classEndTime = document.getElementById("classEndTime").value.trim();


        console.log(`Form Data: ${className}, ${classCategory}, ${classDate}, ${classStartTime}, ${classEndTime}`);
        
        const sql = `UPDATE tblClass SET className = '${className}', classCategory = '${classCategory}', classDate = '${classDate}', classStartTime = '${classStartTime}', classEndTime = '${classEndTime}' WHERE classId = ${classId} LIMIT 1;`;

        runQuery(sql).then(result => {
            if (!result || !result.success) {
                console.log("Failed to update class.");
                return;
            }
            console.log("Class updated successfully!");
            document.location.href = "../HTML/class.html";
        });

        console.log(`SQL Query: ${sql}`);
    });

});