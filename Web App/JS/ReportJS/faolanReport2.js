
async function getSQLInfo(sql, event){
    const response = await fetch("http://localhost/dbConnector.php", {
        method: "POST",
        body: new URLSearchParams({
            query: sql
        })
    }); 

    const result = await response.json().then(event)


}

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

        console.log(event.data);
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

            table.appendChild(row);        
    }

    output.appendChild(table);

    });




    
}

async function report2(output){
    const report2Sql = "SELECT tblcentre.centreName AS 'CentreName', COUNT(x.homeCentreId) AS 'TotalMembers' FROM tblmember x JOIN tblcentre ON x.homeCentreId =tblcentre.centreID GROUP BY homeCentreId  ORDER BY  COUNT('Total Members') DESC;";
    const sqlData = getSQLInfo(report2Sql, event => {
        var nameArray = [];
        var valueArray = [];
        for(const x of event.data){
            nameArray.push(x.CentreName)
            valueArray.push(x.TotalMembers);
        }

        const barColors = ["rgb(219, 80, 64)","rgb(191, 219, 64)","rgb(64, 219, 108)","rgb(64, 204, 219)","rgb(118, 64, 219)"];
    
        var chart = new Chart("reportOutput", {
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







document.addEventListener("DOMContentLoaded", async () => {

    const output1 = document.querySelector("#report1"); 
    const output2 = document.querySelector("#report2");
    const output3 = document.querySelector("#report3"); 

    report1(output1);
    report2(output2);

    
});
