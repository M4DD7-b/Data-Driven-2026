document.addEventListener("DOMContentLoaded", async () => {

    const url = "http://localhost/dbConnector.php";
    const output = document.querySelector("#report2");
    const sql = "SELECT Centre.centreName, concat(Centre.street,', ',Centre.city) AS centreLocation, Centre.unitNo, Centre.postcode,Class.totalClassId, CoachCentre.totalCoachId " +
"FROM fitnessclub.tblcentre AS Centre " +
"JOIN ( SELECT centreID, Count(tblclass.classId) AS totalClassId FROM fitnessclub.tblclass GROUP BY tblclass.centreId) AS Class ON Class.centreId = Centre.centreId " +
"JOIN (SELECT centreId, Count(tblcoachcentre.coachId) AS totalCoachId FROM fitnessclub.tblcoachcentre GROUP BY tblcoachcentre.centreId) AS CoachCentre ON CoachCentre.centreId = Centre.centreId"

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

    var valueArray = [];
    for(const x of result.data){
        valueArray.push(x.TotalMembers);
    }


    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Centre Name", "Address", "Postcode", "Unit Number", "Amount of Classes", "Amount of Coaches"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (const centre of result.data) {
        const row = document.createElement("tr");

        const centreNameCell = document.createElement("td");
        centreNameCell.textContent = centre.centreName;
        row.appendChild(centreNameCell);

        const centreAddressCell = document.createElement("td");
        centreAddressCell.textContent = centre.centreLocation;
        row.appendChild(centreAddressCell);
        
        const centrePostcodeCell = document.createElement("td");
        centrePostcodeCell.textContent = centre.postcode;
        row.appendChild(centrePostcodeCell);

        const centreUnitNumberCell = document.createElement("td");
        centreUnitNumberCell.textContent = centre.unitNo;
        row.appendChild(centreUnitNumberCell);

        const centreClassAmountCell = document.createElement("td");
        centreClassAmountCell.textContent = centre.totalClassId;
        row.appendChild(centreClassAmountCell);

        const centreCoachAmountCell = document.createElement("td");
        centreCoachAmountCell.textContent = centre.totalCoachId;
        row.appendChild(centreCoachAmountCell);

        table.appendChild(row);        
    }

    output.appendChild(table);

});
