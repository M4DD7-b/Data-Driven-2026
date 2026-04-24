document.addEventListener("DOMContentLoaded", async () => {
        const url = "https://mbrum01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";
        const output = document.querySelector("#output");
        const errorOutput = document.querySelector("#error-output");
        const sql = "SELECT m.memberId, CONCAT(m.memberForename, ' ', m.memberSurname) AS memberName, c.centreName AS homeCentre, m.memberEmail, m.memberPhone, m.memberDOB, m.membershipType, m.membershipStartDate FROM tblMember m JOIN tblCentre c ON c.centreId = m.homeCentreId;";

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
        window.location.href = '../AddHTML/addMember.html';
    });

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Member Name", "Home Centre", "Member Email", "Member Phone",
                "Member DOB", "Membership Type", "Membership Started", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const member of result.data) {
        const row = document.createElement("tr");

        const memberNameCell = document.createElement("td");
        memberNameCell.textContent = member.memberName;
        row.appendChild(memberNameCell);
        
        const homeCentreCell = document.createElement("td");
        homeCentreCell.textContent = member.homeCentre;
        row.appendChild(homeCentreCell);

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

        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        editButton.addEventListener("click", () => {
            window.location.href = `../EditHTML/editMember.html?memberId=${member.memberId}`;
        });

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        deleteButton.addEventListener("click", async () => {
            errorOutput.textContent = "";
            if (!confirm("Are you sure you want to delete this member?")) {
                return;
            }   
            const deleteSql = `DELETE FROM tblMember WHERE memberId = ${member.memberId} LIMIT 1;`;

            
            const response = await fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    query: deleteSql
                })
            });

            const result = await response.json();
            
            if (!result || !result.success) {
                console.log("Failed to delete member.");
                errorOutput.textContent = (result.error || "Failed to delete member. Please try again.");
                return;
            }   
            if (result.affected_rows === 0) {
                console.log("No member was deleted. It may have already been removed.");
                errorOutput.textContent = "Failed to delete member. It may have already been removed.";
                return;
            }
            console.log(`result : ${JSON.stringify(result)}`);
            console.log(result.affected_rows);
            console.log("Member deleted successfully!");
            row.remove();
            
        });

    table.appendChild(row);

    }

    output.appendChild(table);
    
});