document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/dbConnector.php";
        const output = document.querySelector("#output");
        const sql = "SELECT * FROM tblCentre;";

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

    const headings = ["Centre ID", "Centre Name", "Centre Street", "Centre City", "Centre Unit No.", "Centre Postcode", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const centre of result.data) {
        const row = document.createElement("tr");

        const centreIdCell = document.createElement("td");
        centreIdCell.textContent = centre.centreId;
        row.appendChild(centreIdCell);

        const centreNameCell = document.createElement("td");
        centreNameCell.textContent = centre.centreName;
        row.appendChild(centreNameCell);

        const centreStreetCell = document.createElement("td");
        centreStreetCell.textContent = centre.street;
        row.appendChild(centreStreetCell);

        const centreCityCell = document.createElement("td");
        centreCityCell.textContent = centre.city;
        row.appendChild(centreCityCell);

        const centreUnitNoCell = document.createElement("td");
        centreUnitNoCell.textContent = centre.unitNo;
        row.appendChild(centreUnitNoCell);

        const centrePostcodeCell = document.createElement("td");
        centrePostcodeCell.textContent = centre.postcode;
        row.appendChild(centrePostcodeCell);

        
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        editButton.addEventListener("click", () => {
            window.location.href = `../EditHTML/editCentre.html?centreId=${centre.centreId}`;
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



