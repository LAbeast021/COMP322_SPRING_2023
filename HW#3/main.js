const alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var processHolder = [];
var processNumber = 1 ;

// _----_----_-----_------_------___------ Query Selecectors _----_----_-----_------_------___------ // 
var processAddForm = $("#Form") ;
var processTable = $("#Process_table") ;
var processTableRow = $("#Process_table_row") ;
var arrivalTableRow = $("#Arrival_table_row") ;
var serviceTableRow = $("#Service_table_row") ;
var turnTableRow = $("#Turn_table_row") ;


// _----_----_-----_------_------___------ Event Listener _----_----_-----_------_------___------ // 
processAddForm.submit(function(evt) {
    evt.preventDefault();
    let process = { 
        arrivalTime : evt.target[0].value ,
        processTime : evt.target[1].value ,
        turnaroundTime : ''
    }
    processHolder.push(process);
    processNumber += 1 ;
    evt.target.reset(); 
    render();
})

// _----_----_-----_------_------___------ Functions  _----_----_-----_------_------___------ // 

function render () {
    if (processNumber <= 5 ) {
        $("#process_input_header")[0].innerText = ` Please Enter Process # ${processNumber} / 5  ` ;
    }
    else {
        processAddForm[0].style.display = 'none';
        processHolder = sortArrayOfObjectLowToHigh(processHolder); // BC it wont preserve the duplicates 
        for (i = 0 ; i < processHolder.length ; i ++) {
            // const newPr = document.createElement("th").innerHTML = `${alph[i]}`;
            const newPr = document.createElement("th");
            let txt = document.createTextNode(alph[i]);
            newPr.appendChild(txt)
            processTableRow.append(newPr);

            // const newAr = document.createElement("td").innerHTML = `${processHolder[i].arrivalTime}`;
            const newAr = document.createElement("td");
            txt = document.createTextNode(processHolder[i].arrivalTime);
            newAr.appendChild(txt);
            arrivalTableRow.append(newAr)

            // const newSrt = document.createElement("td").innerHTML = `${processHolder[i].processTime}`;
            const newSrt = document.createElement("td");
            txt = document.createTextNode(processHolder[i].processTime);
            newSrt.appendChild(txt);
            serviceTableRow.append(newSrt)
        }
        processTable[0].style.visibility = 'visible';

    }
}


// _____________ FOLLOWING FUNCTION IS NOT STABLE _______________________________________
function sortArrayOfObjectLowToHigh (arr) {
    return arr.sort(
        (p1, p2) => (p1.arrivalTime > p2.arrivalTime) ? 1 : (p1.arrivalTime < p2.arrivalTime) ? -1 : 0);
}

render() ;