

document.addEventListener("DOMContentLoaded", async () => {

    function addFilter(table){
        const filter = document.getElementById("filter");
        const tableElement = document.getElementById(table);
        if(tableElement==null){
            console.log("Assigned report does not exist on this webpage")
            return;
        }
        const dropdownValue = document.getElementById("filter-dropdown").value;
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

    function onEvent(){
        addFilter("report1Table");
    }

    const textbox = document.getElementById("filter");
    const dropdown = document.getElementById("filter-dropdown");
    textbox.addEventListener("input", async () => {onEvent()});
    dropdown.addEventListener("change", async () => {onEvent()});

    
})
