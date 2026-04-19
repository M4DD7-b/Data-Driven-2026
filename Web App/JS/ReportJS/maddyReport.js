const url = "http://localhost/dbConnector.php";

async function callSql(sql, onJsonLoad) {
    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({ query: sql })
    });

    await response.json().then(onJsonLoad);

}

async function loadLowestTurnoutData() {
    const sql = "SELECT c.classCategory, COUNT(r.memberId) AS reservedMembers FROM tblClass c LEFT JOIN tblReservation r ON c.classId = r.classId GROUP BY c.classCategory ORDER BY reservedMembers DESC;";

    callSql(sql, data => {
        const ctx = document.getElementById('report1-chart');

        const classCategories = data.data.map(row => row.classCategory);
        const reservedMembers = data.data.map(row => row.reservedMembers);

        console.log("Class Categories:", classCategories);
        console.log("Reserved Members:", reservedMembers);

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: classCategories,
                datasets: [
                    {
                        label: '# of reserved members',
                        data: reservedMembers,
                        borderWidth: 1
                    }
                ]
            }
        });

        const tableContainer = document.getElementById('table1-container');
        tableContainer.innerHTML = ``;

        var table = document.createElement('table');
        const headerRow = document.createElement("tr");

        const headers = ["Class Category", "Reserved Members"];

        for (const heading of headers) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        data.data.forEach(row => {
            const dataRow = document.createElement("tr");

            const classCategoryCell = document.createElement("td");
            classCategoryCell.textContent = row.classCategories;
            dataRow.appendChild(classCategoryCell);

            const reservedMembersCell = document.createElement("td");
            reservedMembersCell.textContent = row.reservedMembers;
            dataRow.appendChild(reservedMembersCell);

            table.appendChild(dataRow);
        });

        tableContainer.appendChild(table);
    });
}

async function loadMassDifferenceData() {
    const sql = "SELECT CONCAT(m.memberForename, ' ', m.memberSurname) AS memberName, MAX(me.memberCurrentMuscleMass) - MIN(me.memberStartMuscleMass) AS massDifference FROM tblMember m JOIN tblMeasurement me ON m.memberId = me.memberId WHERE YEAR(m.membershipStartDate) = YEAR(CURDATE()) GROUP BY m.memberId ORDER BY massDifference ASC LIMIT 10;";

    callSql(sql, data => {
        const ctx = document.getElementById('report2-chart');

        const memberNames = data.data.map(row => row.memberName);
        const massDifferences = data.data.map(row => row.massDifference);

        console.log("Member Names:", memberNames);
        console.log("Mass Differences:", massDifferences);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: memberNames,
                datasets: [
                    {
                        label: 'Muscle Mass Difference',
                        data: massDifferences,
                        borderWidth: 1
                    }
                ]
            }
        });

        const tableContainer = document.getElementById('table2-container');
        tableContainer.innerHTML = ``;

        var table = document.createElement('table');
        const headerRow = document.createElement("tr");

        const headers = ["Member Name", "Mass Difference"];

        for (const heading of headers) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        data.data.forEach(row => {
            const dataRow = document.createElement("tr");

            const classNameCell = document.createElement("td");
            classNameCell.textContent = row.className;
            dataRow.appendChild(classNameCell);

            const reservedMembersCell = document.createElement("td");
            reservedMembersCell.textContent = row.reservedMembers;
            dataRow.appendChild(reservedMembersCell);

            table.appendChild(dataRow);
        });

        tableContainer.appendChild(table);
    });
}

async function loadConditionDifferenceData() {
    const sql = "SELECT CASE WHEN memberCondition IS NOT NULL THEN 'With Condition' ELSE 'Without Condition' END AS conditionStatus, AVG(memberCurrentWeight) AS averageWeight FROM tblMember m JOIN tblMeasurement me ON m.memberId = me.memberId GROUP BY conditionStatus;";

    callSql(sql, data => {
        const ctx = document.getElementById('report3-chart');

        const conditionStatuses = data.data.map(row => row.conditionStatus);
        const averageWeights = data.data.map(row => row.averageWeight);

        console.log("Condition Statuses:", conditionStatuses);
        console.log("Average Weights:", averageWeights);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: conditionStatuses,
                datasets: [
                    {
                        label: 'Average Weight',
                        data: averageWeights,
                        borderWidth: 1
                    }
                ]
            }
        });

        const tableContainer = document.getElementById('table3-container');
        tableContainer.innerHTML = ``;

        var table = document.createElement('table');
        const headerRow = document.createElement("tr");

        const headers = ["Condition Status", "Average Weight"];

        for (const heading of headers) {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        data.data.forEach(row => {
            const dataRow = document.createElement("tr");

            const classNameCell = document.createElement("td");
            classNameCell.textContent = row.className;
            dataRow.appendChild(classNameCell);

            const reservedMembersCell = document.createElement("td");
            reservedMembersCell.textContent = row.reservedMembers;
            dataRow.appendChild(reservedMembersCell);

            table.appendChild(dataRow);
        });

        tableContainer.appendChild(table);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadLowestTurnoutData();
    loadMassDifferenceData();
    loadConditionDifferenceData();
});