
async function getSQLInfo(sql, event){
    const response = await fetch("http://localhost/dbConnector.php", {
        method: "POST",
        body: new URLSearchParams({
            query: sql
        })
    }); 

    const result = await response.json().then(event)


}

//table
async function report1(output){
    const report1Sql = "SELECT Centre.centreName, concat(Centre.street,', ',Centre.city) AS centreLocation, Centre.unitNo, Centre.postcode,Class.totalClassId, CoachCentre.totalCoachId " +
"FROM tblcentre AS Centre " +
"JOIN ( SELECT centreID, Count(tblclass.classId) AS totalClassId FROM tblclass GROUP BY tblclass.centreId) AS Class ON Class.centreId = Centre.centreId " +
"JOIN (SELECT centreId, Count(tblcoachcentre.coachId) AS totalCoachId FROM tblcoachcentre GROUP BY tblcoachcentre.centreId) AS CoachCentre ON CoachCentre.centreId = Centre.centreId"

    var sqlData = getSQLInfo(report1Sql, event => {

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const headings = ["Centre Name", "Address", "Postcode", "Unit Number", "Amount of Classes", "Amount of Coaches"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        //console.log(event.data);
        for (const centre of event.data) {
            const row = document.createElement("tr");

            const centreNameCell = document.createElement("td");
            centreNameCell.textContent = centre.centreName;
            row.appendChild(centreNameCell);

            const centreAddressCell = document.createElement("td");
            centreAddressCell.textContent = centre.centreLocation;
            row.appendChild(centreAddressCell);
        
            const centrePostcodeCell = document.createElement("td");
            centrePostcodeCell.textContent = centre.postcode;
            row.appendChild(centrePostcodeCell);

            const centreUnitNumberCell = document.createElement("td");
            centreUnitNumberCell.textContent = centre.unitNo;
            row.appendChild(centreUnitNumberCell);

            const centreClassAmountCell = document.createElement("td");
            centreClassAmountCell.textContent = centre.totalClassId;
            row.appendChild(centreClassAmountCell);

            const centreCoachAmountCell = document.createElement("td");
            centreCoachAmountCell.textContent = centre.totalCoachId;
            row.appendChild(centreCoachAmountCell);

            table.style.tableLayout = "fixed";
            table.style.width = 100%
            table.appendChild(row);        
    }

    output.appendChild(table);

    });




    
}

//bar chart
async function report2(){
    const report2Sql = "SELECT tblcentre.centreName AS 'CentreName', COUNT(x.homeCentreId) AS 'TotalMembers' FROM tblmember x JOIN tblcentre ON x.homeCentreId =tblcentre.centreID GROUP BY homeCentreId  ORDER BY  COUNT('Total Members') DESC;";
    const sqlData = getSQLInfo(report2Sql, event => {
        var nameArray = [];
        var valueArray = [];
        for(const x of event.data){
            nameArray.push(x.CentreName)
            valueArray.push(x.TotalMembers);
        }

        const barColors = ["rgb(219, 80, 64)","rgb(191, 219, 64)","rgb(64, 219, 108)","rgb(64, 204, 219)","rgb(118, 64, 219)"];
    
        var chart = new Chart("report2Output", {
            type: "bar",
            data: {
                labels: nameArray,
                datasets: [{
                    label: "Total members in each centre",
                    backgroundColor: barColors,
                    data: valueArray,
                }]
            },
            options: { scales: {   yAxes: [{ ticks: { beginAtZero: true } }] } }
        });
    });
}

//line chart
async function report3(){ 
    const report3Sql = "SELECT AVG(DATEDIFF(CURDATE(),member.membershipStartDate)) AS average FROM tblmember AS member WHERE DATEDIFF(CURDATE(), member.memberDOB) < 7306 UNION ALL " +
"SELECT AVG(DATEDIFF(CURDATE(),member.membershipStartDate))  FROM tblmember AS member WHERE DATEDIFF(CURDATE(), member.memberDOB) >= 7306 && DATEDIFF(CURDATE(), member.memberDOB) < 10958 UNION ALL " +
"SELECT AVG(DATEDIFF(CURDATE(),member.membershipStartDate))  FROM tblmember AS member WHERE DATEDIFF(CURDATE(), member.memberDOB) >= 10958 && DATEDIFF(CURDATE(), member.memberDOB) < 14610 UNION ALL " +
"SELECT AVG(DATEDIFF(CURDATE(),member.membershipStartDate))  FROM tblmember AS member WHERE DATEDIFF(CURDATE(), member.memberDOB) >= 14610 && DATEDIFF(CURDATE(), member.memberDOB) < 18263 UNION ALL " +
"SELECT AVG(DATEDIFF(CURDATE(),member.membershipStartDate))  FROM tblmember AS member WHERE DATEDIFF(CURDATE(), member.memberDOB) >= 18263;";
//average time with service of each age group

const sqlData = getSQLInfo(report3Sql, event => {
    const lineColourArray = ["rgb(130, 74, 17)","rgb(190, 74, 17)","rgb(230, 74, 17)","rgb(74, 17, 117)","rgb(219, 64, 134)"];
    var nameArray = ["Under 20", "20 - 30", "30 - 40", "40 - 50", "50+"];
    var valueArray = [];
    for(const x of event.data){
        valueArray.push(x.average);
    }

    var chart = new Chart("report3Output", {
        type: 'line',
        data: {
            labels: nameArray,
            datasets: [{
                label: "Average time spent with Benchmark Fitness of different age groups (days)",
                data: valueArray,
                backgroundColor: lineColourArray,
                borderWidth: 1
            }]
        },
        options:{
            scales:{
                y: {
                    beginAtZero: true,
                }
            }
        }
    })


})


}







document.addEventListener("DOMContentLoaded", async () => {

    const output1 = document.querySelector("#report1Output"); 

    report1(output1);
    report2();
    report3();



    document.getElementById('report1Link').addEventListener('click', function() {

        const report1 = document.getElementById('report1Output');
        const report2 = document.getElementById('report2Output');
        const report3 = document.getElementById('report3Output');

        report1.style.display = 'block';
        report2.style.display = 'none';
        report3.style.display = 'none';
    });

    document.getElementById('report2Link').addEventListener('click', function() {

        const report1 = document.getElementById('report1Output');
        const report2 = document.getElementById('report2Output');
        const report3 = document.getElementById('report3Output');

        report1.style.display = 'none';
        report2.style.display = 'block';
        report3.style.display = 'none';
    });

    document.getElementById('report3Link').addEventListener('click', function() {

        const report1 = document.getElementById('report1Output');
        const report2 = document.getElementById('report2Output');
        const report3 = document.getElementById('report3Output');

        report1.style.display = 'none';
        report2.style.display = 'none';
        report3.style.display = 'block';
    });

    
});
