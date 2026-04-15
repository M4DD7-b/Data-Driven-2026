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

    const centre = new URL(location.href).searchParams.get('centreId');

    console.log(`Centre ID: ${centreId}`);

    const sql = `SELECT * FROM tblCentre WHERE centreId = '${centreId}' LIMIT 1;`;

    console.log(`SQL Query: ${sql}`);

    runQuery(sql).then(result => {
        if (!result || !result.success) {
            console.log("Failed to find centre.");
            return;
        }  

        console.log("Found centre data!");
        const centre = result.data[0];

        document.getElementById("centreName").value = centre.centreName;
        document.getElementById("centreStreet").value = centre.centreStreet;
        document.getElementById("centreCity").value = centre.centreCity;
        document.getElementById("centreUnitNo").value = centre.centreUnitNo;
        document.getElementById("centrePostcode").value = centre.centrePostcode;

    });

    document.getElementById("centreForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        console.log("Form submitted!");

        const centreName = document.getElementById("centreName").value.trim();   
        const centreStreet = document.getElementById("centreStreet").value.trim();
        const centreCity = document.getElementById("centreCity").value.trim();
        const centreUnitNo = document.getElementById("centreUnitNo").value.trim();
        const centrePostcode = document.getElementById("centrePostcode").value.trim();


        console.log(`Form Data: ${centreName}, ${centreStreet}, ${centreCity}, ${centreUnitNo}, ${centrePostcode}`);
        
        const sql = `UPDATE tblCentre SET centreName = '${centreName}', centreStreet = '${centreStreet}', centreCity = '${centreCity}', centreUnitNo = '${centreUnitNo}', centrePostcode = '${centrePostcode}' WHERE centreId = ${centre} LIMIT 1;`;

        runQuery(sql).then(result => {
            if (!result || !result.success) {
                console.log("Failed to update centre.");
                return;
            }
            console.log("Centre updated successfully!");
            document.location.href = "../HTML/centre.html";
        });

        console.log(`SQL Query: ${sql}`);
    });

});