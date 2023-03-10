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
    console.log(processHolder);
    processNumber += 1 ;
    evt.target.reset(); 
})

function render () {
    if (processNumber <= 5 ) {
        console.log($("#process_input_header")[0] , processNumber)
        $("#process_input_header")[0].innerText = " sag" 
    }
}

render() ;