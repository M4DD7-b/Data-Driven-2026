
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
"LEFT JOIN ( SELECT centreID, Count(tblclass.classId) AS totalClassId FROM tblclass GROUP BY tblclass.centreId) AS Class ON Class.centreId = Centre.centreId " +
"JOIN (SELECT centreId, Count(tblcoachcentre.coachId) AS totalCoachId FROM tblcoachcentre GROUP BY tblcoachcentre.centreId) AS CoachCentre ON CoachCentre.centreId = Centre.centreId"


    var sqlData = getSQLInfo(report1Sql, event => {

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        const headings = ["Centre Name", "Address", "Postcode", "Unit Number", "Amount of Classes", "Amount of Coaches"];

        for (const heading of headings) {
            const th = document.createElement("th");
            th.textContent = heading;
            th.style.overflowWrap="anywhere";
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
            if(centre.totalClassId==null){
                centreClassAmountCell.textContent = 0;
            }
            row.appendChild(centreClassAmountCell);

            const centreCoachAmountCell = document.createElement("td");
            centreCoachAmountCell.textContent = centre.totalCoachId;
            row.appendChild(centreCoachAmountCell);

            table.style.tableLayout = "auto";
            table.appendChild(row);        
    }

    //table.setAttribute("table-layout","fixed")
    //table.setAttribute("width","100%");
    table.id = "report1Table"
    
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

        const barColors = [
            "rgb(219, 80, 64)",
            "rgb(191, 219, 64)",
            "rgb(64, 219, 108)",
            "rgb(64, 204, 219)",
            "rgb(118, 64, 219)",
            "rgb(116, 134, 39)",
            "rgb(33, 117, 57)",
            "rgb(31, 98, 105)",
            "rgb(48, 25, 90)",
            "rgb(14, 5, 88)",
            "rgb(59, 22, 18)",
            "rgb(0, 0, 0)",
        ];
    
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
            options: { 
                scales: {   
                    yAxes: [{ 
                        ticks: { beginAtZero: true } 
                    }],
                } 
            }
        });
    });
}

//line chart
async function report3(){ 
    const report3Sql = "SELECT * FROM vwUnderTwenty UNION ALL " + 
    "SELECT * FROM vwTwentyThirty UNION ALL " +
    "SELECT * FROM vwThirtyForty UNION ALL " + 
    "SELECT * FROM vwFortyFifty UNION ALL " + 
    "SELECT * FROM vwFiftyPlus;";
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

    document.getElementById("report_title").textContent = "Details of current centres and amounts of classes / coaches each has"


    document.getElementById('report1Link').addEventListener('click', function() {

        document.getElementById("report_title").textContent = "Details of current centres and amounts of classes / coaches each has"

        const report1 = document.getElementById('report1Output');
        const report2 = document.getElementById('report2Output');
        const report3 = document.getElementById('report3Output');

        report1.style.display = 'block';
        report2.style.display = 'none';
        report3.style.display = 'none';
    });

    document.getElementById('report2Link').addEventListener('click', function() {

        document.getElementById("report_title").textContent = "Bar Chart showing total registered members in each Benchmark Fitness centre";

        const report1 = document.getElementById('report1Output');
        const report2 = document.getElementById('report2Output');
        const report3 = document.getElementById('report3Output');

        report1.style.display = 'none';
        report2.style.display = 'block';
        report3.style.display = 'none';
    });

    document.getElementById('report3Link').addEventListener('click', function() {

        document.getElementById("report_title").textContent = "Line Chart showing average time spent with Benchmark Fitness of different age groups";


        const report1 = document.getElementById('report1Output');
        const report2 = document.getElementById('report2Output');
        const report3 = document.getElementById('report3Output');

        report1.style.display = 'none';
        report2.style.display = 'none';
        report3.style.display = 'block';
    });

    
});
