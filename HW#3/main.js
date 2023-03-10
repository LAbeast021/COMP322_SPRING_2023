var processHolder = [];
var processNumber = 1 ;

// _----_----_-----_------_------___------ Query Selecectors _----_----_-----_------_------___------ // 
const processAddForm = $("#Form") ;


// _----_----_-----_------_------___------ Event Listener _----_----_-----_------_------___------ // 
processAddForm.submit(function(evt) {
    evt.preventDefault();
    let process = { 
        arrivalTime : evt.target[0].value ,
        processTime : evt.target[1].value
    }
    processHolder.push(process);
    processNumber += 1 ;
    evt.target.reset(); 
    render();
})

// _----_----_-----_------_------___------ Functions  _----_----_-----_------_------___------ // 

function render () {
    if (processNumber <= 5 ) {
        $("#process_input_header")[0].innerText = ` Please Enter Process # ${processNumber} ` ;
    }
    else {

    }
}

render() ;