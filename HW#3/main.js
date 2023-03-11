var processHolder = [];
var processNumber = 1 ;

// _----_----_-----_------_------___------ Query Selecectors _----_----_-----_------_------___------ // 
var processAddForm = $("#Form") ;


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
        processHolder = sortArrayOfObjectLowToHigh(processHolder) ;   
    }
}

function sortArrayOfObjectLowToHigh (arr) {
    return arr.sort(
        (p1, p2) => (p1.arrivalTime > p2.arrivalTime) ? 1 : (p1.arrivalTime < p2.arrivalTime) ? -1 : 0);
}

render() ;