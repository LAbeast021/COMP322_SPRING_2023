var processHolder = [];
var processNumber = 1 ;

// _----_----_-----_------_------___------ Query Selecectors _----_----_-----_------_------___------ // 
$("#Form").submit(function(evt) {
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

function render () {
    if (processNumber <= 5 ) {
        $("#process_input_header")[0].innerText = ` Please Enter Process # ${processNumber} ` ;
    }
}

render() ;