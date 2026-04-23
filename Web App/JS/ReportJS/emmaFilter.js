document.addEventListener("DOMContentLoaded", async () => {

    function addFirstFilter(table){
        const filter = document.getElementById("filter1");
        const tableElement = document.getElementById(table);
        if(tableElement==null){
            console.log("Assigned report does not exist on this webpage")
            return;
        }
        
        const dropdownValue = document.getElementById("filter-dropdown1").value;
        const filterText = filter.value;
        const rows = tableElement.rows;

        for(let i = 1; i< rows.length; i++){
            rows[i].style.display="";
        }
        
        for(let i = 1; i< rows.length; i++){
            const cell = rows[i].cells[dropdownValue];
            const upperFilterText = filterText.toUpperCase();
            const upperCellText = cell.textContent.toUpperCase();

            if(!upperCellText.includes(upperFilterText)){
                rows[i].style.display="none";
            }
        }
    }

    function addSecondFilter(table){
        const filter = document.getElementById("filter2");
        const tableElement = document.getElementById(table);

        if(tableElement==null){
            console.log("Assigned report does not exist on this webpage")
            return;
        }

        const dropdownValue = document.getElementById("filter-dropdown2").value;
        const filterText = filter.value;
        const rows = tableElement.rows;

        for(let i = 1; i< rows.length; i++){
            rows[i].style.display="";
        }
        
        for(let i = 1; i< rows.length; i++){
            const cell = rows[i].cells[dropdownValue];
            const upperFilterText = filterText.toUpperCase();
            const upperCellText = cell.textContent.toUpperCase();

            if(!upperCellText.includes(upperFilterText)){
                rows[i].style.display="none";
            }
        }
    }

    function addThirdFilter(table){
        const filter = document.getElementById("filter3");
        const tableElement = document.getElementById(table);
        
        if(tableElement==null){
            console.log("Assigned report does not exist on this webpage")
            return;
        }

        const dropdownValue = document.getElementById("filter-dropdown3").value;
        const filterText = filter.value;
        const rows = tableElement.rows;

        for(let i = 1; i< rows.length; i++){
            rows[i].style.display="";
        }
        
        for(let i = 1; i< rows.length; i++){
            const cell = rows[i].cells[dropdownValue];
            const upperFilterText = filterText.toUpperCase();
            const upperCellText = cell.textContent.toUpperCase();

            if(!upperCellText.includes(upperFilterText)){
                rows[i].style.display="none";
            }
        }
    }

    function onReport1Event(){ addFirstFilter("reportOneTable"); }

    function onReport2Event(){ addSecondFilter("reportTwoTable"); }

    function onReport3Event(){ addThirdFilter("reportThreeTable"); }

    const textbox1 = document.getElementById("filter1");
    const dropdown1 = document.getElementById("filter-dropdown1");

    const textbox2 = document.getElementById("filter2");
    const dropdown2 = document.getElementById("filter-dropdown2");

    const textbox3 = document.getElementById("filter3");
    const dropdown3 = document.getElementById("filter-dropdown3");

    textbox1.addEventListener("input", async () => {onReport1Event()});
    dropdown1.addEventListener("change", async () => {onReport1Event()});

    textbox2.addEventListener("input", async () => {onReport2Event()});
    dropdown2.addEventListener("change", async () => {onReport2Event()});

    textbox3.addEventListener("input", async () => {onReport3Event()});
    dropdown3.addEventListener("change", async () => {onReport3Event()});
})
