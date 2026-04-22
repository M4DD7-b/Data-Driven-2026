document.addEventListener("DOMContentLoaded", function() {

    loadPopularTimeSlots(document.getElementById("table1-container"));
    loadMemberPerCentre(document.getElementById("table2-container"));
    loadMemberAttendance(document.getElementById("table3-container"));

    const tabs = document.querySelectorAll(".tab");

for (const tab of tabs) {
    tab.addEventListener("click", function() {

        document.querySelectorAll("#report1, #report2, #report3").forEach(report => {
            report.classList.remove("view");
            report.classList.add("hide");
        });

        tabs.forEach(button => {
            button.classList.remove("active");
        });

        const selectedReport = document.getElementById(this.dataset.report);

        selectedReport.classList.remove("hide");
        selectedReport.classList.add("view");

        this.classList.add("active");
    });
}

});

const url = "http://localhost/dbConnector.php"

async function fetchSQL(sql,load) {
    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({ query: sql})

    });

    const result = await response.json();
    console.log(result);
    load(result)
}

// REPORT 1 : MOST POPULAR TIME SLOT 
async function loadPopularTimeSlots(output) {
    const sql = `SELECT c.classStartTime, COUNT(r.memberID) AS total_attendance FROM tblClass c LEFT JOIN tblReservation r ON c.classID = r.classID GROUP BY c.classStartTime ORDER BY total_attendance DESC;`;

    var sqlData = fetchSQL(sql, event => {
        console.log(JSON.stringify(event, null, 2));
        
        const tableContainer = document.getElementById("table1-container");
        tableContainer.innerHTML = ``;

        const table = document.createElement("table");
        const headerRow = document.createElement('tr');

        const headings = ["Start Time", "Total Attendance"];

        for(const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        const labels = [];
        const data = [];

    

        for (const row of event.data) {

            const tr = document.createElement("tr");

            const time = document.createElement("td");
            time.textContent = row.classStartTime;
            tr.appendChild(time);

            const count = document.createElement("td");
            count.textContent = row.total_attendance;
            tr.appendChild(count);

            table.appendChild(tr);

             labels.push(row.classStartTime);
            data.push(row.total_attendance);


           

        }
        output.appendChild(table);
        const ctx = document.getElementById("chart1-container")
         new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Attendance per Time Slot",
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })

        
    })
};

// REPORT 2: MEMEBER PER CENTRE
async function loadMemberPerCentre(output) {
    const sql = `SELECT c.centreName, COUNT(m.memberID) AS total_members FROM tblCentre c  LEFT JOIN tblMember m  ON c.centreID = m.homeCentreId GROUP BY c.centreName ORDER BY total_members DESC;`;

    var sqlData = fetchSQL(sql, event => {
        console.log(JSON.stringify(event, null, 2));

        const tableContainer = document.getElementById("table2-container");
        tableContainer.innerHTML = ``;

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const headings = ["Centres", "Total Members"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        for (const row of event.data) {
             const tr = document.createElement("tr");

            const centre = document.createElement("td");
            centre.textContent = row.centreName;
            tr.appendChild(centre);

            const count = document.createElement("td");
            count.textContent = row.total_members;
            tr.appendChild(count);

            table.appendChild(tr);
        }
        output.appendChild(table);


    })
};

// REPORT 3 - MEMBER ATTENDANCE 
async function loadMemberAttendance(output) {
    const sql = `SELECT  m.memberID,CONCAT(m.memberForename, ' ', m.memberSurname) AS fullName,COUNT(r.classID) AS total_classes FROM tblMember m LEFT JOIN tblReservation r ON m.memberID = r.memberID GROUP BY m.memberID, fullName ORDER BY total_classes DESC;`;

    var sqlData = fetchSQL(sql, event => {
        console.log(JSON.stringify(event, null, 2));
        const tableContainer = document.getElementById('table3-container');
        tableContainer.innerHTML = ``;

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const headings = ["Member ID", "Name", "Class Attended"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        for (const row of event.data) {
            const tr = document.createElement("tr");

            const id = document.createElement("td");
            id.textContent = row.memberID;
            tr.appendChild(id);

            const name = document.createElement("td");
            name.textContent = row.fullName;
            tr.appendChild(name);

            const count = document.createElement("td");
            count.textContent = row.total_classes;
            tr.appendChild(count);

            table.appendChild(tr);
        }
        output.appendChild(table);
    })
};
