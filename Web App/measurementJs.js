document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/mbrum/dbConnectorDefault.php";
        const output = document.querySelector("#output");
        const sql = "SELECT * FROM tblMeasurement;";

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

    const headings = ["Member ID", "Member Start Weight", "Member Current Weight", "Member Start Muscle Mass", "Member Current Muslce Mass", "Member Condition"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const measurement of result.data) {
        const row = document.createElement("tr");

        const memberIdCell = document.createElement("td");
        memberIdCell.textContent = measurement.memberId;
        row.appendChild(memberIdCell);

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

        table.appendChild(row);
    }

    output.appendChild(table);

});
