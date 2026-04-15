document.addEventListener("DOMContentLoaded", async () => {

    const url = "http://localhost/dbConnector.php";
    const output = document.querySelector("#report1");
    const sql = "SELECT tblcentre.centreName AS 'CentreName', COUNT(x.homeCentreId) AS 'TotalMembers' FROM fitnessclub.tblmember x JOIN fitnessclub.tblcentre ON x.homeCentreId =tblcentre.centreID GROUP BY homeCentreId  ORDER BY  COUNT('Total Members') DESC;";

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


    var nameArray = [];
    var valueArray = [];
    for(const x of result.data){
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
