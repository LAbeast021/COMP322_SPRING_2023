
var type ;
var processHolder = [];
var processNumber = 1 , limitOfProcess ;

// _----_----_-----_------_------___------ Query Selecectors _----_----_-----_------_------___------ // 

var processAddForm = $("#Form") ;
var processTable = $("#Process_table") ;
var processTableRow = $("#Process_table_row") ;
var arrivalTableRow = $("#Arrival_table_row") ;
var serviceTableRow = $("#Service_table_row") ;
var turnTableRow = $("#Turn_table_row") ;
var algHolder = $("#algorithmsHolder") ;
var algHolderButton = $("#algorithmsHolder button") ;
var startB = $("#startB");
var processHolderDiv = $("#processHolder") ;

// _----_----_-----_------_------___------ Event Listener _----_----_-----_------_------___------ // 
$("#numberOfProcess").submit(function(evt) {
    evt.preventDefault();
    limitOfProcess = parseInt(evt.target[0].value);
    processAddForm[0].style.visibility = "visible" ;
    evt.target.style.visibility = "hidden";
    render()
})
processAddForm.submit(function(evt) {
    evt.preventDefault();
    let process = { 
        arrivalTime : parseInt(evt.target[0].value) ,
        processTime : parseInt(evt.target[1].value) ,
        turnaroundTime : ''
    }
    processHolder.push(process);
    processNumber += 1 ;
    evt.target.reset(); 
    render();
})
algHolderButton.on("click" , function(evt) {
        evt.target == algHolderButton[0] ? evt.target.className = "clicked" : algHolderButton[0].className = "unclicked" ;
        evt.target == algHolderButton[1] ? evt.target.className = "clicked" : algHolderButton[1].className = "unclicked" ;
        type = evt.target.value;
        $("#startB")[0].style.visibility = 'visible';
})
startB.on("click" , function(evt) {
    algHolderButton[0].disabled = true;
    algHolderButton[1].disabled = true ;
    switch (type) {
        case "FIFO":
            FIFO();
            break;
        case "SJF":
             SJF();
             break;    
        default:
            break;
    }
    startB[0].disabled = true;
})

// _----_----_-----_------_------___------ Functions  _----_----_-----_------_------___------ // 

function render () {
    if (processNumber <= limitOfProcess ) {
        $("#process_input_header")[0].innerText = ` Please Enter Process # ${processNumber} / ${limitOfProcess}  ` ;
    }
    else {
        processAddForm[0].style.display = 'none';
        processHolder = sortArrayOfObjectLowToHigh(processHolder); // BC it wont preserve the duplicates 
        for (i = 0 ; i < processHolder.length ; i ++) {
            // const newPr = document.createElement("th").innerHTML = `${alph[i]}`;
            const newPr = document.createElement("th");
            let txt = document.createTextNode("P" + (i+1));
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
            serviceTableRow.append(newSrt);
        }
        processTable[0].style.visibility = 'visible';
        algHolder[0].style.visibility = 'visible';

    }
}


function FIFO (){
    let currentTime = 0;
  let totalTurnaroundTime = 0;
  let numProcesses = processHolder.length;
  
  // Iterate through the processes in the order of their arrival time
  for (let i = 0; i < numProcesses; i++) {
    let process = processHolder[i];
    let processFinishTime = currentTime + process.processTime;
    let processTurnaroundTime = processFinishTime - process.arrivalTime;
    
    totalTurnaroundTime += processTurnaroundTime;
    currentTime = processFinishTime;
    
    // Update the table cell for the process turnaround time
    let newTurn = document.createElement("td");
    let txt = document.createTextNode(processTurnaroundTime);
    newTurn.appendChild(txt);
    turnTableRow.append(newTurn);
  }
  
  // Calculate and display the average turnaround time
  let avgTurnaroundTime = totalTurnaroundTime / numProcesses;
  let resultDiv = $("<div>").addClass("result").text(`Average Turnaround Time: ${avgTurnaroundTime.toFixed(2)}`);
  processHolderDiv.append(resultDiv);
    
    

}

function SJF (){
    turnAroundTimeCalculator(0);
    let currentTime = 0;
    let remainingProcesses = processes.slice();
    let finishedProcesses = [];
  
    while (remainingProcesses.length > 0) {
      let shortestProcessIndex = 0;
      for (let i = 1; i < remainingProcesses.length; i++) {
        if (remainingProcesses[i].executionTime < remainingProcesses[shortestProcessIndex].executionTime) {
          shortestProcessIndex = i;
        }
      }
  
      let currentProcess = remainingProcesses.splice(shortestProcessIndex, 1)[0];
  
      currentTime = Math.max(currentTime, currentProcess.arrivalTime);
      let turnaroundTime = currentTime + currentProcess.executionTime - currentProcess.arrivalTime;
  
      currentProcess.turnaroundTime = turnaroundTime;

      finishedProcesses.push(currentProcess);
  
      currentTime += currentProcess.executionTime;
    }
}


function turnAroundTimeCalculator (type) {
    if (type) {
       let st = processHolder[0].arrivalTime ;
        for(i = 0 ; i < processHolder.length ; i++) {
            let et = st + processHolder[i].processTime;
            processHolder[i].turnaroundTime = et - st ;
            let newSrt = document.createElement("td");
            txt = document.createTextNode(processHolder[i].turnaroundTime);
            newSrt.appendChild(txt);
            turnTableRow.append(newSrt)
            st = et ;

        }
    }
    else {
        
    }
}


// _____________ FOLLOWING FUNCTION IS NOT STABLE _______________________________________ //
function sortArrayOfObjectLowToHigh (arr) {
    return arr.sort(
        (p1, p2) => (p1.arrivalTime > p2.arrivalTime) ? 1 : (p1.arrivalTime < p2.arrivalTime) ? -1 : 0);
}

// render() ;