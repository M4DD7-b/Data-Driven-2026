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

    const headings = ["Centre ID", "Centre Name", "Centre Street", "Centre City", "Centre Unit No.", "Centre Postcode"];

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

        table.appendChild(row);
    }

    output.appendChild(table);

});
