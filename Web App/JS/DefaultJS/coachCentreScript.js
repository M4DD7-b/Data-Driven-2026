document.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost/dbConnector.php";
    const output = document.querySelector("#output");
    const errorOutput = document.querySelector("#error-output");
    const sql = "SELECT c.coachId, ce.centreId, CONCAT(c.coachForename, ' ', c.coachSurname) AS coachName, ce.centreName FROM tblcoachcentre cc JOIN tblCoach c ON cc.coachId = c.coachId JOIN tblCentre ce ON cc.centreId = ce.centreId;";

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
        window.location.href = '../AddHTML/addCoachCentre.html';
    });

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Coach Name", "Assigned Centre", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (const coachCentre of result.data) {
        const row = document.createElement("tr");

        const coachNameCell = document.createElement("td");
        coachNameCell.textContent = coachCentre.coachName;
        row.appendChild(coachNameCell);
        
        const assignedCentreCell = document.createElement("td");
        assignedCentreCell.textContent = coachCentre.centreName;
        row.appendChild(assignedCentreCell);

        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        editButton.addEventListener("click", () => {
            window.location.href = `../EditHTML/editCoachCentre.html?coachId=${coachCentre.coachId}&&centreId=${coachCentre.centreId}`;
        });

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        deleteButton.addEventListener("click", async () => {
            errorOutput.textContent = "";
            if (!confirm("Are you sure you want to delete this assignment?")) {
                return;
            }   
            const deleteSql = `DELETE FROM tblCoachCentre WHERE coachId = ${coachCentre.coachId} && centreId = ${coachCentre.centreId} LIMIT 1;`;

            
            const response = await fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    query: deleteSql
                })
            });

            const result = await response.json();
            
            if (!result || !result.success) {
                console.log("Failed to delete assignment.");
                errorOutput.textContent = (result.error || "Failed to delete assignment. Please try again.");
                return;
            }   
            if (result.affected_rows === 0) {
                console.log("No assignment was deleted. It may have already been removed.");
                errorOutput.textContent = "Failed to delete assignment. It may have already been removed.";
                return;
            }
            console.log(`result : ${JSON.stringify(result)}`);
            console.log(result.affected_rows);
            console.log("Assignment deleted successfully!");
            row.remove();
            
        });

        table.appendChild(row);

    }

    output.appendChild(table);

});
