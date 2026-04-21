
const url = "http://localhost/dbConnector.php";

async function callSql(sql, onJsonLoad) {
    // Send the SQL statement in the body of a POST request.
    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({ query: sql })
    });


    await response.json().then(onJsonLoad);
}


async function loadClassPerCoachData() {
    const sql = `SELECT * FROM vwCoachClass;`

    callSql(sql, data => {
        const ctx = document.getElementById('report1-chart');
        
        const ids = data.data.map(row => row.coachId);
        const names = data.data.map(row => row.coachName);
        const counts = data.data.map(row => row.entryCount);

        console.log("IDs:", ids);
        console.log("Names:", names);
        console.log("Counts:", counts); 

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [
                    {
                        label: '# of classes',
                        data: counts,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        // Remove decimal places from y-axis labels
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        const tableContainer = document.getElementById('table1-container');
        tableContainer.innerHTML = ``;

        var table = document.createElement('table');
        const headerRow = document.createElement("tr");

        const headings = ["Coach ID", "Coach Name", "Number of classes"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        data.data.forEach(element => {
            const row = document.createElement("tr");

            const coachIdCell = document.createElement("td");
            coachIdCell.textContent = element.coachId;
            row.appendChild(coachIdCell);

            const coachNameCell = document.createElement("td");
            coachNameCell.textContent = element.coachName;
            row.appendChild(coachNameCell);

            const entryCountCell = document.createElement("td");
            entryCountCell.textContent = element.entryCount;
            row.appendChild(entryCountCell);

            table.appendChild(row);

        });

        tableContainer.appendChild(table);
    
        

    });

}

async function loadMembershipLengthData() {
    const sql = `SELECT m.memberId, CONCAT(m.memberForename, ' ', m.memberSurname) as 'memberName', DATEDIFF(CURRENT_DATE, m.membershipStartDate) as 'membershipLength' FROM tblmember m;`;
    callSql(sql, data => {
        const ctx = document.getElementById('report2-chart');
        
        const ids = data.data.map(row => row.memberId);
        const names = data.data.map(row => row.memberName);
        const counts = data.data.map(row => Number(row.membershipLength));

        console.log("IDs:", ids);
        console.log("Names:", names);
        console.log("Counts:", counts); 

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: names,
                datasets: [
                    {
                        label: 'Length of membership (days)',
                        data: counts,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        // Remove decimal places from y-axis labels
                    }
                }
            }
        });

        const tableContainer = document.getElementById('table2-container');
        tableContainer.innerHTML = ``;

        var table = document.createElement('table');
        const headerRow = document.createElement("tr");

        const headings = ["Member ID", "Member Name", "Membership Length (days)"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        data.data.forEach(element => {
            const row = document.createElement("tr");

            const memberIdCell = document.createElement("td");
            memberIdCell.textContent = element.memberId;
            row.appendChild(memberIdCell);

            const memberNameCell = document.createElement("td");
            memberNameCell.textContent = element.memberName;
            row.appendChild(memberNameCell);

            const membershipLengthCell = document.createElement("td");
            membershipLengthCell.textContent = element.membershipLength;
            row.appendChild(membershipLengthCell);

            table.appendChild(row);

        });

        tableContainer.appendChild(table);
    

    });


}


async function loadClassPerGymData() {
    const sql = `SELECT c.centreId, c.centreName, COUNT(cl.classId) AS classCount FROM tblcentre c LEFT JOIN tblclass cl ON c.centreId = cl.centreId GROUP BY c.centreId;`;

    callSql(sql, data => {
        const ctx = document.getElementById('report3-chart');
        
        const ids = data.data.map(row => row.centreId);
        const names = data.data.map(row => row.centreName);
        const counts = data.data.map(row => row.classCount);

        console.log("IDs:", ids);
        console.log("Names:", names);
        console.log("Counts:", counts); 

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [
                    {
                        label: '# of classes',
                        data: counts,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        // Remove decimal places from y-axis labels
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        const tableContainer = document.getElementById('table3-container');
        tableContainer.innerHTML = ``;

        var table = document.createElement('table');
        const headerRow = document.createElement("tr");

        const headings = ["Gym ID", "Gym Name", "Number of classes"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        data.data.forEach(element => {
            const row = document.createElement("tr");

            const centreIdCell = document.createElement("td");
            centreIdCell.textContent = element.centreId;
            row.appendChild(centreIdCell);

            const centreNameCell = document.createElement("td");
            centreNameCell.textContent = element.centreName;
            row.appendChild(centreNameCell);

            const classCountCell = document.createElement("td");
            classCountCell.textContent = element.classCount;
            row.appendChild(classCountCell);

            table.appendChild(row);

        });

        tableContainer.appendChild(table);

    });

}

function toggleTableView(reportNumber) {

    const viewButton = document.getElementById(`tableView-report${reportNumber}`);
    const tableContainer = document.getElementById(`table${reportNumber}-container`);
    const chartContainer = document.getElementById(`chart${reportNumber}-container`);

    // Make either the table or chart visible, and update the button text accordingly
    if(tableContainer.style.display === 'block') {
        tableContainer.style.display = 'none';
        chartContainer.style.display = 'block';
        viewButton.textContent = "View as Table";
    } else {
        tableContainer.style.display = 'block';
        chartContainer.style.display = 'none';
        viewButton.textContent = "View as Chart";
    }
}

document.addEventListener('DOMContentLoaded', function() {

    // Load all report data and render charts
    loadClassPerCoachData();
    loadMembershipLengthData();
    loadClassPerGymData();

    // Dynamically find all view toggling buttons and attach event listeners
    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', () => toggleTableView(button.id.substring("tableView-report".length)));
    });

    // document.getElementById('tableView-report1').addEventListener('click', () => toggleTableView(1));
    // document.getElementById('tableView-report2').addEventListener('click', () => toggleTableView(2));
    // document.getElementById('tableView-report3').addEventListener('click', () => toggleTableView(3));

});
