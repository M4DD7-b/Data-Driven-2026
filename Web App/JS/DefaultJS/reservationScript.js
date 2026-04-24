document.addEventListener("DOMContentLoaded", async () => {
        const url = "https://mbrum01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";
        const output = document.querySelector("#output");
        const errorOutput = document.querySelector("#error-output");
        const sql = "SELECT me.memberId, c.classId, c.className, CONCAT(me.memberForename, ' ', me.memberSurname) AS memberName FROM tblReservation r JOIN tblClass c ON c.classId = r.classId JOIN tblMember me ON me.memberId = r.memberId;";

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
        window.location.href = '../AddHTML/addReservation.html';
    });

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headings = ["Class Name", "Member Name", "Edit", "Delete"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const reservation of result.data) {
        const row = document.createElement("tr");

        const classNameCell = document.createElement("td");
        classNameCell.textContent = reservation.className;
        row.appendChild(classNameCell);

        const memberNameCell = document.createElement("td");
        memberNameCell.textContent = reservation.memberName;
        row.appendChild(memberNameCell);

        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        editButton.addEventListener("click", () => {
            window.location.href = `../EditHTML/editReservation.html?classId=${reservation.classId}`;
        });

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        deleteButton.addEventListener("click", async () => {
            errorOutput.textContent = "";
            if (!confirm("Are you sure you want to delete this reservation?")) {
                return;
            }   
            const deleteSql = `DELETE FROM tblReservation WHERE classId = ${reservation.classId} && memberId = ${reservation.memberId} LIMIT 1;`;

            
            const response = await fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    query: deleteSql
                })
            });

            const result = await response.json();
            
            if (!result || !result.success) {
                console.log("Failed to delete reservation.");
                errorOutput.textContent = (result.error || "Failed to delete reservation. Please try again.");
                return;
            }   
            if (result.affected_rows === 0) {
                console.log("No reservation was deleted. It may have already been removed.");
                errorOutput.textContent = "Failed to delete reservation. It may have already been removed.";
                return;
            }
            console.log(`result : ${JSON.stringify(result)}`);
            console.log(result.affected_rows);
            console.log("Reservation deleted successfully!");
            row.remove();
            
        });

    table.appendChild(row);

    }

    output.appendChild(table);
    
});
