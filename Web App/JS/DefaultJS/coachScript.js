document.addEventListener("DOMContentLoaded", async () => {

    const url = "http://localhost/dbConnector.php";
    const output = document.querySelector("#output");
    const errorOutput = document.querySelector("#error-output");
    const sql = "SELECT coachId, CONCAT(coachForename, ' ', coachSurname) AS coachName, coachEmail, coachPhone, coachSpecialisation FROM tblCoach;";

    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
            query: sql
        })
    });

    const result = await response.json();

    if (!result || !result.success || result.data.length === 0) {
        output.textContent = "No data found.";
        return;
    }

    document.querySelector('.addEntity').addEventListener('click', () => {
        window.location.href = '../AddHTML/addCoach.html';
    });

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Coach Name", "Coach Email", "Coach Phone", "Coach Specialisation", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (const coach of result.data) {
        const row = document.createElement("tr");

        const coachName = document.createElement("td");
        coachName.textContent = coach.coachName;
        row.appendChild(coachName);
        
        const coachEmailCell = document.createElement("td");
        coachEmailCell.textContent = coach.coachEmail;
        row.appendChild(coachEmailCell);

        const coachPhoneCell = document.createElement("td");
        coachPhoneCell.textContent = coach.coachPhone;
        row.appendChild(coachPhoneCell);

        const coachSpecialisationCell = document.createElement("td");
        coachSpecialisationCell.textContent = coach.coachSpecialisation;
        row.appendChild(coachSpecialisationCell);

        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        editButton.addEventListener("click", () => {
            window.location.href = `../EditHTML/editCoach.html?coachId=${coach.coachId}`;
        });

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
<<<<<<< HEAD

        deleteButton.addEventListener("click", async () => {
=======
        deleteButton.addEventListener("click", async (event) => {
            errorOutput.textContent = "";
>>>>>>> af2b18dbd4ef94a1b1f544c884398f802133627b
            if (!confirm("Are you sure you want to delete this coach?")) {
                return;
            }   

            const deleteSql = `DELETE FROM tblCoach WHERE coachId = ${coach.coachId} LIMIT 1;`;
            
            const response = await fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    query: deleteSql
                })
            });

            const result = await response.json();
            
            if (!result || !result.success) {
                console.log("Failed to delete coach.");
                errorOutput.textContent = (result.error || "Unknown error");
                return;
            }   
            if (result.affected_rows === 0) {
                console.log("No coach was deleted. It may have already been removed.");
                errorOutput.textContent = "No coach was deleted. It may have already been removed.";
                return;
            }
            console.log(`result : ${JSON.stringify(result)}`);
            console.log(result.affected_rows);
            console.log("Coach deleted successfully!");
            row.remove();
            
        });

        table.appendChild(row);

    }

    output.appendChild(table);

});
