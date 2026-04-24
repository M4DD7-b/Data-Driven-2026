const url = "https://mbrum01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";

async function callSql(sql, onJsonLoad) {
    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
            query: sql
        })
    });

    await response.json().then(onJsonLoad);
}

function showModal(title, members) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title')
    const modalList = document.getElementById('modal-list');

    modalTitle.textContent = title;
    modalList.innerHTML= '';

    if (!members || members.length === 0) {
        const li = document.createElement('li');
        li.textContent = "No members found.";
        modalList.appendChild(li);
    } else {
        for (const member of members) {
            const li = document.createElement('li');
            li.textContent = member.memberName || `${member.memberForename || ''} ${member.memberSurname || ''}`.trim();
            modalList.appendChild(li);
        }
    }
    modal.classList.remove('hidden');
}

function hideModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

async function loadTurnoutData() {
    const sql = "SELECT c.classCategory, COUNT(r.memberId) AS reservedMembers FROM tblClass c LEFT JOIN tblReservation r ON c.classId = r.classId GROUP BY c.classCategory ORDER BY reservedMembers DESC;";

    callSql(sql, data => {
        const canvas = document.getElementById('report1-chart');
        const ctx = canvas.getContext ? canvas.getContext('2d') : canvas;

        const classCategories = data.data.map(row => row.classCategory);
        const reservedMembers = data.data.map(row => row.reservedMembers);
        
        if (window._report1Chart) window._report1Chart.destroy();
            window._report1Chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: classCategories,
                datasets: [{ label: '# of reserved members', data: reservedMembers, borderWidth: 1 }]
            },
            options: {
                onClick: (event, elements) => {
                    if (!elements.length) {
                        return;
                    } else {
                        const element = elements[0];
                        const index = element.index;
                        const category = classCategories[index];

                        const membersSQL = `SELECT m.memberId, CONCAT(m.memberForename, ' ', m.memberSurname) AS memberName FROM tblMember m JOIN tblReservation r ON m.memberId = r.memberId JOIN tblClass c ON r.classId = c.classId WHERE c.classCategory = '${category}';`;
                        
                        callSql(membersSQL, membersData => {
                            const members = membersData.data;
                            showModal(`Members attending: ${category}`, members);
                        });
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'right'
                }
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
    const sql = "SELECT CONCAT(m.memberForename, ' ', m.memberSurname) AS memberName, MAX(me.memberCurrentMuscleMass) - MIN(me.memberStartMuscleMass) AS massDifference FROM tblMember m JOIN tblMeasurement me ON m.memberId = me.memberId WHERE YEAR(m.membershipStartDate) = YEAR(CURDATE()) GROUP BY m.memberId ORDER BY massDifference DESC LIMIT 5;";

    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
            query: sql
        })
    });

    const result = await response.json();

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    const tableContainer = document.getElementById('table2-container');

    const headers = ["Member Name", "Mass Difference"];

    for (const heading of headers) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (const measure of result.data) {
        const row = document.createElement("tr");

        const memberNameCell = document.createElement("td");
        memberNameCell.textContent = measure.memberName;
        row.appendChild(memberNameCell);

        const massDifferenceCell = document.createElement("td");
        massDifferenceCell.textContent = measure.massDifference;
        row.appendChild(massDifferenceCell);

        table.appendChild(row);
    }

    tableContainer.appendChild(table);
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
  const closeBtn = document.getElementById('close');
  if (closeBtn) closeBtn.addEventListener('click', hideModal);

  loadTurnoutData();
  loadMassDifferenceData();
  loadConditionDifferenceData();
});