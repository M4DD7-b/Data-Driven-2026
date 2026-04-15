document.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost/dbConnector.php";
    const output = document.querySelector("#output");
    const sql = "SELECT * FROM tblCoach;";

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

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Coach ID", "Coach Forename", "Coach Surname", "Coach Email", "Coach Phone", "Coach Specialisation", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (const coach of result.data) {
        const row = document.createElement("tr");

        const coachIdCell = document.createElement("td");
        coachIdCell.textContent = coach.coachId;
        row.appendChild(coachIdCell);

        const coachForenameCell = document.createElement("td");
        coachForenameCell.textContent = coach.coachForename;
        row.appendChild(coachForenameCell);

        const coachSurnameCell = document.createElement("td");
        coachSurnameCell.textContent = coach.coachSurname;
        row.appendChild(coachSurnameCell);
        
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
        deleteButton.addEventListener("click", async () => {
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
                return;
            }   
            if (result.affected_rows === 0) {
                console.log("No coach was deleted. It may have already been removed.");
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
