document.addEventListener('DOMContentLoaded', function() {

    // inserting into containers
    loadMedicalConditionData(document.getElementById("table1-container"));
    loadOlderMembers(document.getElementById("table2-container"));
    loadCentreSpecialised(document.getElementById("table3-container"));

    // DROPDOWN
    document.getElementById("report_dropdown").addEventListener('change', function (event) {
        'use strict';

        var view = document.querySelector('.view'), report_dropdown = document.getElementById(this.value);

        if (view !== null) {
            view.className = 'hide';
        }

        if (report_dropdown !== null ) {
            report_dropdown.className = 'view';
        }
    });
});
    

// CONNECTING DB THROUGH PHP
const url = "http://localhost/dbConnector.php";


async function fetchSQL(sql, load){
    const response = await fetch(
        "http://localhost/dbConnector.php", 
        {
        method: "POST",
        body: new URLSearchParams({ query: sql })
        }
    ); 

    const result = await response.json().then(load)
}


// REPORT ONE - TABLE
async function loadMedicalConditionData(output) {
    const reportOneSql = "SELECT * FROM vwMedicalCondition;"
    
    var sqlData = fetchSQL(reportOneSql, event => {

        const tableContainer = document.getElementById('table1-container');
        tableContainer.innerHTML = ``;

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const headings = ["Member ID", "Member Name", "Medical Condition"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        for (const mdl of event.data) {
            const row = document.createElement("tr");

            // member ID
            const mbrIDCell = document.createElement("td");
            mbrIDCell.textContent = mdl.memberID;
            row.appendChild(mbrIDCell);

            // member name
            const mbrNameCell = document.createElement("td");
            mbrNameCell.textContent = mdl.fullName;
            row.appendChild(mbrNameCell);
        
            // medical condition
            const mbrConditionCell = document.createElement("td");
            mbrConditionCell.textContent = mdl.memberCondition;
            row.appendChild(mbrConditionCell);

            table.appendChild(row);        
        }
        
        table.id = "reportOneTable";

        output.appendChild(table);
    })

};

// REPORT TWO - TABLE
async function loadOlderMembers(output) {
    const reportTwoSql = "SELECT * FROM vwOlderMembers;"
    
    var sqlData = fetchSQL(reportTwoSql, event => {

        const tableContainer = document.getElementById('table2-container');
        tableContainer.innerHTML = ``;

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const headings = ["Member Name", "Date of Birth", "Age"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        for (const age of event.data) {
            const row = document.createElement("tr");

            // member name
            const mbrNameCell = document.createElement("td");
            mbrNameCell.textContent = age.fullName;
            row.appendChild(mbrNameCell);
        
            // member date of birth
            const mbrDobCell = document.createElement("td");
            mbrDobCell.textContent = age.memberDOB;
            row.appendChild(mbrDobCell);

            // age of member
            const mbrAgeCell = document.createElement("td");
            mbrAgeCell.textContent = age.memberAge;
            row.appendChild(mbrAgeCell);

            table.appendChild(row);        
        }

        table.id = "reportTwoTable";

        output.appendChild(table);
    })

};

// REPORT THREE - TABLE + CHART
async function loadCentreSpecialised(output) {
    
    const reportThreeSql = "SELECT * FROM vwSpecialisationNumber;"
    
    var sqlData = fetchSQL(reportThreeSql, event => {
        
        // REPORT THREE - TABLE
        const ctnr = document.getElementById('chart-container');
        const barColours = ["rgb(222, 48, 34)","rgb(255, 127, 39)","rgb(255, 201, 14)","rgb(181, 230, 29)","rgb(106, 230, 30)","rgb(37, 209, 55)","rgb(20, 215, 143)","rgb(0, 162, 232)","rgb(63, 72, 204)","rgb(160, 85, 186)","rgb(212, 66, 178)","rgb(240, 74, 132)"];
        // AMEND WHEN MORE DATA ADDED !!!!!!!
        // ["rgb(222, 48, 34)","rgb(255, 127, 39)","rgb(255, 201, 14)","rgb(181, 230, 29)","rgb(106, 230, 30)","rgb(37, 209, 55)","rgb(20, 215, 143)","rgb(0, 162, 232)","rgb(63, 72, 204)","rgb(160, 85, 186)","rgb(212, 66, 178)","rgb(240, 74, 132)"]
        
        const names = event.data.map(row => row.centreName);
        const cities = event.data.map(row => row.city);
        const specials = event.data.map(row => row.numSpecialisation);

        console.log("Centres:", names);
        console.log("Cities:", cities);
        console.log("Specialisations:", specials); 

        new Chart(ctnr, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [
                    {
                        label: 'Number of different coach specialisations per centre:',
                        backgroundColor: barColours,
                        data: specials,
                        borderWidth: 1
                    }
                ]
            },

            options: {
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }]
                }
            }
        });

        // REPORT THREE - TABLE
        const tableContainer = document.getElementById('table3-container');
        tableContainer.innerHTML = ``;

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const headings = ["Centre Name", "City", "Number of Specialisations"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        for (const spc of event.data) {
            const row = document.createElement("tr");

            // centre name
            const cnrNameCell = document.createElement("td");
            cnrNameCell.textContent = spc.centreName;
            row.appendChild(cnrNameCell);
        
            // centre city
            const cnrCityCell = document.createElement("td");
            cnrCityCell.textContent = spc.city;
            row.appendChild(cnrCityCell);

            // unique coach specialisations
            const cnrSpcCell = document.createElement("td");
            cnrSpcCell.textContent = spc.numSpecialisation;
            row.appendChild(cnrSpcCell);

            table.appendChild(row);        
        }

        table.id = "reportThreeTable";

        output.appendChild(table);
    })

};