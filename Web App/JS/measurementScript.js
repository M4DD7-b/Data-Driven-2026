document.addEventListener("DOMContentLoaded", async () => {
        const url = "http://localhost/dbConnector.php";
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

    const headings = ["Member ID", "Member Start Weight", "Member Current Weight", "Member Start Muscle Mass", "Member Current Muscle Mass", "Member Condition", "Actions"];

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

        const tdDelete = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
          // Ask the user to confirm before removing a row from the database.
          const shouldDelete = confirm(`Delete measurement ${measurement.memberId}?`);
          if (!shouldDelete) {
            return;
          }

          // Delete the selected row by matching its member ID.
          const deleteSql = `DELETE FROM tblMeasurement WHERE memberId = ${measurement.memberId}`;
          const deleteResult = await runQuery(deleteSql);

          if (deleteResult && deleteResult.success) {
            const res = await runQuery(deleteSql);
            showMessage("Measurement record deleted successfully.", "success");
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
