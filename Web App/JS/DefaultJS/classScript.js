document.addEventListener("DOMContentLoaded", async () => {
        const url = "https://mbrum01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";
        const output = document.querySelector("#output");
        const errorOutput = document.querySelector("#error-output");
        const sql = "SELECT c.classId, ce.centreName, c.classCategory, c.classDate, c.classStartTime, c.classEndTime FROM tblClass c JOIN tblCentre ce ON c.centreId = ce.centreId;";

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
        window.location.href = '../AddHTML/addClass.html';
    });
    

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Centre Name", "Class Category", "Class Date", "Class Start Time", "Class End Time", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const session of result.data) {
        const row = document.createElement("tr");

        const centreNameCell = document.createElement("td");
        centreNameCell.textContent = session.centreName;
        row.appendChild(centreNameCell);
        
        const classCategoryCell = document.createElement("td");
        classCategoryCell.textContent = session.classCategory;
        row.appendChild(classCategoryCell);

        const classDateCell = document.createElement("td");
        classDateCell.textContent = session.classDate;
        row.appendChild(classDateCell);

        const classStartTimeCell = document.createElement("td");
        classStartTimeCell.textContent = session.classStartTime;
        row.appendChild(classStartTimeCell);

        const classEndTimeCell = document.createElement("td");
        classEndTimeCell.textContent = session.classEndTime;
        row.appendChild(classEndTimeCell);

        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        editButton.addEventListener("click", () => {
            window.location.href = `../EditHTML/editClass.html?classId=${session.classId}`;
        });


        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        deleteButton.addEventListener("click", async () => {
            errorOutput.textContent = "";

            if (!confirm("Are you sure you want to delete this class?")) {
                return;
            }   
            const deleteSql = `DELETE FROM tblClass WHERE classId = ${session.classId} LIMIT 1;`;

            
            const response = await fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    query: deleteSql
                })
            });

            const result = await response.json();
            
            if (!result || !result.success) {
                console.log("Failed to delete class.");
                errorOutput.textContent = (result.error || "Unknown error");
                return;
            }   
            if (result.affected_rows === 0) {
                console.log("No class was deleted. It may have already been removed.");
                errorOutput.textContent = "No class was deleted. It may have already been removed.";
                return;
            }
            console.log(`result : ${JSON.stringify(result)}`);
            console.log(result.affected_rows);
            console.log("Class deleted successfully!");
            row.remove();
            
        });

    table.appendChild(row);

    }

    output.appendChild(table);
    
});



