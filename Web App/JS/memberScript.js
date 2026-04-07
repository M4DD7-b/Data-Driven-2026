document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/dbConnector.php";
        const output = document.querySelector("#output");
        const sql = "SELECT * FROM tblMember;";

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

    const headings = ["Home Centre ID", "Member ID", "Member Forename", "Member Surname", "Member Email", "Member Phone",
                "Member DOB", "Membership Type", "Membership Started"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const member of result.data) {
        const row = document.createElement("tr");

        const homeCentreIdCell = document.createElement("td");
        homeCentreIdCell.textContent = member.homeCentreId;
        row.appendChild(homeCentreIdCell);

        const memberIdCell = document.createElement("td");
        memberIdCell.textContent = member.memberId;
        row.appendChild(memberIdCell);

        const memberForenameCell = document.createElement("td");
        memberForenameCell.textContent = member.memberForename;
        row.appendChild(memberForenameCell);
        
        const memberSurnameCell = document.createElement("td");
        memberSurnameCell.textContent = member.memberSurname;
        row.appendChild(memberSurnameCell);

        const memberEmailCell = document.createElement("td");
        memberEmailCell.textContent = member.memberEmail;
        row.appendChild(memberEmailCell);

        const memberPhoneCell = document.createElement("td");
        memberPhoneCell.textContent = member.memberPhone;
        row.appendChild(memberPhoneCell);

        const memberDOBCell = document.createElement("td");
        memberDOBCell.textContent = member.memberDOB;
        row.appendChild(memberDOBCell);

        const membershipTypeCell = document.createElement("td");
        membershipTypeCell.textContent = member.membershipType;
        row.appendChild(membershipTypeCell);

        const membershipStartDateCell = document.createElement("td");
        membershipStartDateCell.textContent = member.membershipStartDate;
        row.appendChild(membershipStartDateCell);

        table.appendChild(row);
    }

    output.appendChild(table);

});
