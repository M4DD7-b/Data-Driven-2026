document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/dbConnector.php";
        const output = document.querySelector("#output");
        const sql = "SELECT * FROM tblReservation;";

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

    const headings = ["Class ID", "Member ID", "Actions"];

    for (const heading of headings) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const reservation of result.data) {
        const row = document.createElement("tr");

        const classIdCell = document.createElement("td");
        classIdCell.textContent = reservation.classId;
        row.appendChild(classIdCell);

        const memberIdCell = document.createElement("td");
        memberIdCell.textContent = reservation.memberId;
        row.appendChild(memberIdCell);

        const tdDelete = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
          // Ask the user to confirm before removing a row from the database.
          const shouldDelete = confirm(`Delete reservation ${reservation.memberId}?`);
          if (!shouldDelete) {
            return;
          }

          // Delete the selected row by matching its member ID.
          const deleteSql = `DELETE FROM tblReservation WHERE memberId = ${reservation.memberId} AND classId = ${reservation.classId};`;
          const deleteResult = await runQuery(deleteSql);

          if (deleteResult && deleteResult.success) {
            const res = await runQuery(deleteSql);
            showMessage("Reservation record deleted successfully.", "success");
            printTable();
            return res.ok;
          }

          if (deleteResult && deleteResult.error) {
            showMessage(deleteResult.error, "error");
          } else {
            showMessage("Unable to delete the record.", "error");
          }
        });

      tdDelete.appendChild(deleteButton);
      row.appendChild(tdDelete);

     const showMessage = (text, type) => {
        const output = document.getElementById("output");
        output.textContent = text;
        output.className = `message ${type}`;
      };

      const runQuery = async (sql) => {
      try {
        // This is the PHP endpoint that talks to the database for us.
        const url = "http://localhost/dbConnector.php";

        // Send the SQL statement in the body of a POST request.
        const response = await fetch(url, {
          method: "POST",
          body: new URLSearchParams({ query: sql })
        });

        // Stop and report a problem if the web request itself failed.
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }

        // Convert the JSON text from PHP into a JavaScript object.
        const result = await response.json();
        return result;

      } catch (error) {
        // Log errors so they can be seen in the browser console during debugging.
        console.log(error.message);
      }
    };

        table.appendChild(row);
    }
    
    output.appendChild(table);
});
