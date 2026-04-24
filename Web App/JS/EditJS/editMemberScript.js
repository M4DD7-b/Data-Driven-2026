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

    const memberId = new URL(location.href).searchParams.get('memberId');

    console.log(`Member ID: ${memberId}`);

    const sql = `SELECT * FROM tblMember WHERE memberId = '${memberId}' LIMIT 1;`;

    console.log(`SQL Query: ${sql}`);

    runQuery(sql).then(result => {
        if (!result || !result.success) {
            console.log("Failed to find member.");
            return;
        }  

        console.log("Found member data!");
        const session = result.data[0];

        document.getElementById("memberForename").value = session.memberForename;
        document.getElementById("memberSurname").value = session.memberSurname;
        document.getElementById("memberEmail").value = session.memberEmail;
        document.getElementById("memberPhone").value = session.memberPhone;
        document.getElementById("memberDateOfBirth").value = session.memberDOB;
        document.getElementById("memberType").value = session.membershipType;
        document.getElementById("membershipStartDate").value = session.membershipStartDate;

    });

    document.getElementById("memberForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        console.log("Form submitted!");

        const memberForename = document.getElementById("memberForename").value.trim();
        const memberSurname = document.getElementById("memberSurname").value.trim();
        const memberEmail = document.getElementById("memberEmail").value.trim();
        const memberPhone = document.getElementById("memberPhone").value.trim();
        const memberDateOfBirth = document.getElementById("memberDateOfBirth").value.trim();
        const memberType = document.getElementById("memberType").value.trim();
        const membershipStartDate = document.getElementById("membershipStartDate").value.trim();

        if(memberForename === "" || memberSurname === "" || memberEmail === "" || memberPhone === "" || memberDateOfBirth === "" || memberType === "" || membershipStartDate === "") {
            console.log("Please fill in all fields.");
            return;
        }

        console.log(`Form Data: ${memberForename}, ${memberSurname}, ${memberEmail}, ${memberPhone}, ${memberDateOfBirth}, ${memberType}, ${membershipStartDate}`);
        
        const sql = `UPDATE tblMember SET memberForename = '${memberForename}', memberSurname = '${memberSurname}', memberEmail = '${memberEmail}', memberPhone = '${memberPhone}', memberDOB = '${memberDateOfBirth}', membershipType = '${memberType}', membershipStartDate = '${membershipStartDate}' WHERE memberId = ${memberId} LIMIT 1;`;

        runQuery(sql).then(result => {
            if (!result || !result.success) {
                console.log("Failed to update member.");
                return;
            }
            console.log("Member updated successfully!");
            document.location.href = "../HTML/member.html";
        });

        console.log(`SQL Query: ${sql}`);
    });

});