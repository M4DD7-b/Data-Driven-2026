d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000   1) document.addEventListener("DOMContentLoaded", async () => {
21f3395b Web App/JS/classScript.js           (M4DD7-b 2026-04-07 14:10:40 +0100   2)         const url = "http://localhost/dbConnector.php";
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000   3)         const output = document.querySelector("#output");
601fb1d0 Web App/JS/DefaultJS/classScript.js (Mkeo102 2026-04-20 18:18:18 +0100   4)         const errorOutput = document.querySelector("#error-output");
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100   5)         const sql = "SELECT ce.centreName, c.classCategory, c.classDate, c.classStartTime, c.classEndTime FROM tblClass c JOIN tblCentre ce ON c.centreId = ce.centreId;";
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000   6) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000   7)         const response = await fetch(url, {
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000   8)             method: "POST",
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000   9)             body: new URLSearchParams({
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  10)                 query: sql
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  11)             })
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  12)         });
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  13) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  14)         const result = await response.json();
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  15) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  16)     if (!result || !result.success || result.data.length === 0) {
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  17)         output.textContent = "No data found.";
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  18)         return;
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  19)     }
761ad888 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-16 08:30:20 +0100  20) 
761ad888 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-16 08:30:20 +0100  21)         document.querySelector('.addEntity').addEventListener('click', () => {
761ad888 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-16 08:30:20 +0100  22)         window.location.href = '../AddHTML/addClass.html';
761ad888 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-16 08:30:20 +0100  23)     });
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  24)     
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  25) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  26)     const table = document.createElement("table");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  27)     const headerRow = document.createElement("tr");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  28) 
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  29)     const headings = ["Centre Name", "Class Category", "Class Date", "Class Start Time", "Class End Time", "Edit", "Delete"];
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  30) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  31)     for (const heading of headings) {
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  32)         const th = document.createElement("th");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  33)         th.textContent = heading;
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  34)         headerRow.appendChild(th);
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  35)     }
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  36) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  37)     table.appendChild(headerRow);
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  38) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  39)     for (const session of result.data) {
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  40)         const row = document.createElement("tr");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  41) 
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  42)         const centreNameCell = document.createElement("td");
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  43)         centreNameCell.textContent = session.centreName;
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  44)         row.appendChild(centreNameCell);
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  45)         
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  46)         const classCategoryCell = document.createElement("td");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  47)         classCategoryCell.textContent = session.classCategory;
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  48)         row.appendChild(classCategoryCell);
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  49) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  50)         const classDateCell = document.createElement("td");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  51)         classDateCell.textContent = session.classDate;
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  52)         row.appendChild(classDateCell);
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  53) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  54)         const classStartTimeCell = document.createElement("td");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  55)         classStartTimeCell.textContent = session.classStartTime;
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  56)         row.appendChild(classStartTimeCell);
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  57) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  58)         const classEndTimeCell = document.createElement("td");
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  59)         classEndTimeCell.textContent = session.classEndTime;
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  60)         row.appendChild(classEndTimeCell);
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000  61) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  62)         const editCell = document.createElement("td");
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  63)         const editButton = document.createElement("button");
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  64)         editButton.textContent = "Edit";
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  65)         editCell.appendChild(editButton);
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  66)         row.appendChild(editCell);
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  67)         editButton.addEventListener("click", () => {
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  68)             window.location.href = `../EditHTML/editClass.html?classId=${session.classId}`;
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  69)         });
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  70) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  71) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  72)         const deleteCell = document.createElement("td");
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  73)         const deleteButton = document.createElement("button");
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  74)         deleteButton.textContent = "Delete";
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  75)         deleteCell.appendChild(deleteButton);
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  76)         row.appendChild(deleteCell);
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  77)         deleteButton.addEventListener("click", async () => {
601fb1d0 Web App/JS/DefaultJS/classScript.js (Mkeo102 2026-04-20 18:18:18 +0100  78)             errorOutput.textContent = "";
601fb1d0 Web App/JS/DefaultJS/classScript.js (Mkeo102 2026-04-20 18:18:18 +0100  79) 
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  80)             if (!confirm("Are you sure you want to delete this class?")) {
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  81)                 return;
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  82)             }   
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  83)             const deleteSql = `DELETE FROM tblClass WHERE classId = ${session.classId} LIMIT 1;`;
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  84) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  85)             
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  86)             const response = await fetch(url, {
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  87)                 method: "POST",
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  88)                 body: new URLSearchParams({
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  89)                     query: deleteSql
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  90)                 })
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  91)             });
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  92) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  93)             const result = await response.json();
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  94)             
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  95)             if (!result || !result.success) {
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100  96)                 console.log("Failed to delete class.");
601fb1d0 Web App/JS/DefaultJS/classScript.js (Mkeo102 2026-04-20 18:18:18 +0100  97)                 errorOutput.textContent = (result.error || "Unknown error");
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  98)                 return;
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100  99)             }   
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 100)             if (result.affected_rows === 0) {
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100 101)                 console.log("No class was deleted. It may have already been removed.");
601fb1d0 Web App/JS/DefaultJS/classScript.js (Mkeo102 2026-04-20 18:18:18 +0100 102)                 errorOutput.textContent = "No class was deleted. It may have already been removed.";
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 103)                 return;
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 104)             }
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 105)             console.log(`result : ${JSON.stringify(result)}`);
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 106)             console.log(result.affected_rows);
37752ae6 Web App/JS/DefaultJS/classScript.js (M4DD7-b 2026-04-19 09:48:20 +0100 107)             console.log("Class deleted successfully!");
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 108)             row.remove();
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 109)             
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 110)         });
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 111) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 112)     table.appendChild(row);
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 113) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000 114)     }
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000 115) 
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000 116)     output.appendChild(table);
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 117)     
d0524193 classScript.js                      (M4DD7-b 2026-03-19 12:53:07 +0000 118) });
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 119) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 120) 
23154232 Web App/JS/classScript.js           (M4DD7-b 2026-04-15 21:33:22 +0100 121) 
