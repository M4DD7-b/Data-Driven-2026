document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/mbrum/dbConnectorDefault.php";
        const output = document.querySelector("#output");
        const sql = "SELECT * FROM tblClass;";

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

    const headings = ["Centre ID", "Class ID", "Class Name", "Class Category", "Class Date", "Class Start Time", "Class End Time"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const session of result.data) {
        const row = document.createElement("tr");

        const centreIdCell = document.createElement("td");
        centreIdCell.textContent = session.centreId;
        row.appendChild(centreIdCell);

        const classIdCell = document.createElement("td");
        classIdCell.textContent = session.classId;
        row.appendChild(classIdCell);

        const classNameCell = document.createElement("td");
        classNameCell.textContent = session.className;
        row.appendChild(classNameCell);
        
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

        table.appendChild(row);
    }

    output.appendChild(table);

});
