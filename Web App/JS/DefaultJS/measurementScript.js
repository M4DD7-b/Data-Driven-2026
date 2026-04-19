document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/dbConnector.php";
        const output = document.querySelector("#output");
        const sql = "SELECT CONCAT(me.memberForename, ' ', me.memberSurname) AS memberName, m.memberStartWeight, m.memberCurrentWeight, m.memberStartMuscleMass, m.memberCurrentMuscleMass, m.memberCondition FROM tblMeasurement m JOIN tblMember me ON m.memberId = me.memberId;";

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
        window.location.href = '../AddHTML/addMeasurement.html';
    });

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Member Name", "Member Start Weight", "Member Current Weight", "Member Start Muscle Mass", "Member Current Muscle Mass", "Member Condition", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const measurement of result.data) {
        const row = document.createElement("tr");

        const memberNameCell = document.createElement("td");
        memberNameCell.textContent = measurement.memberName;
        row.appendChild(memberNameCell);

        const memberStartWeightCell = document.createElement("td");
        memberStartWeightCell.textContent = measurement.memberStartWeight;
        row.appendChild(memberStartWeightCell);

        const memberCurrentWeightCell = document.createElement("td");
        memberCurrentWeightCell.textContent = measurement.memberCurrentWeight;
        row.appendChild(memberCurrentWeightCell);
        
        const memberStartMuscleMassCell = document.createElement("td");
        memberStartMuscleMassCell.textContent = measurement.memberStartMuscleMass;
        row.appendChild(memberStartMuscleMassCell);

        const memberCurrentMuscleMassCell = document.createElement("td");
        memberCurrentMuscleMassCell.textContent = measurement.memberCurrentMuscleMass;
        row.appendChild(memberCurrentMuscleMassCell);

        const memberConditionCell = document.createElement("td");
        memberConditionCell.textContent = measurement.memberCondition;
        row.appendChild(memberConditionCell);
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        editButton.addEventListener("click", () => {
            window.location.href = `../EditHTML/editMeasurement.html?memberId=${measurement.memberId}`;
        });

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        deleteButton.addEventListener("click", async () => {
            if (!confirm("Are you sure you want to delete this measurement?")) {
                return;
            }   
            const deleteSql = `DELETE FROM tblMeasurement WHERE memberId = ${measurement.memberId} LIMIT 1;`;

            
            const response = await fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    query: deleteSql
                })
            });

            const result = await response.json();
            
            if (!result || !result.success) {
                console.log("Failed to delete measurement.");
                return;
            }   
            if (result.affected_rows === 0) {
                console.log("No measurement was deleted. It may have already been removed.");
                return;
            }
            console.log(`result : ${JSON.stringify(result)}`);
            console.log(result.affected_rows);
            console.log("Measurement deleted successfully!");
            row.remove();
            
        });

    table.appendChild(row);

    }

    output.appendChild(table);
    
});


