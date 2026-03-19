document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/mbrum/dbConnectorDefault.php";
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

    const headings = ["Coach ID", "Coach Forename", "Coach Surname", "Coach Email", "Coach Phone", "Coach Specialisation"];

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

        table.appendChild(row);
    }

    output.appendChild(table);

});
