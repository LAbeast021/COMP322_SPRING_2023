
const prompt = require("prompt-sync")({sigint:true}); 

var nextFitIndex = 0;
let memory = [8,-10,12,-5,16,-35,67,-44,76];


displayMemory("before");

function displayMemory (when) {
    console.log(` The Memory ${when} running the program ->  `);
    for(i=0 ; i < memory.length ; i++ ) {
        console.log("| " + memory[i] + " |");
    }
}

// Function to allocate memory using the first-fit strategy
function allocateFirstFit(size) {
  for (let i = 0; i < memory.length; i++) {
    if (memory[i] < 0 && Math.abs(memory[i]) >= size) {
      // Allocate the block
      const blockSize = Math.abs(memory[i]);
      if (blockSize === size) {
        // Block size matches the requested size exactly
        memory[i] = -size;
      } else {
        // Split the block into allocated and free parts
        memory.splice(i, 0, -size, blockSize - size);
        memory.splice(i + 2, 1);
      }
      return true;
    }
  }
  return false; // Allocation failed
}

function allocateNextFit(size) {
  for (let i = nextFitIndex; i < memory.length; i++) {
    if (memory[i] < 0 && Math.abs(memory[i]) >= size) {
      // Allocate the block
      const blockSize = Math.abs(memory[i]);
      if (blockSize === size) {
        // Block size matches the requested size exactly
        memory[i] = -size;
      } else {
        // Split the block into allocated and free parts
        memory.splice(i, 0, -size, blockSize - size);
        memory.splice(i + 2, 1);
      }
      nextFitIndex = i + 1;
      return true;
    }
  }

  // Wrap around to the beginning of the memory array
  for (let i = 0; i < nextFitIndex; i++) {
    if (memory[i] < 0 && Math.abs(memory[i]) >= size) {
      // Allocate the block
      const blockSize = Math.abs(memory[i]);
      if (blockSize === size) {
        // Block size matches the requested size exactly
        memory[i] = -size;
      } else {
        // Split the block into allocated and free parts
        memory.splice(i, 0, -size, blockSize - size);
        memory.splice(i + 2, 1);
      }
      nextFitIndex = i + 1;
      return true;
    }
  }

  return false; // Allocation failed
}

function allocateBestFit(size) {
  let bestFitIndex = -1;
  let minFragmentation = Infinity;

  for (let i = 0; i < memory.length; i++) {
    if (memory[i] < 0 && Math.abs(memory[i]) >= size) {
      const fragmentation = Math.abs(memory[i]) - size;
      if (fragmentation < minFragmentation) {
        minFragmentation = fragmentation;
        bestFitIndex = i;
      }
    }
  }

  if (bestFitIndex !== -1) {
    // Allocate the block
    const blockSize = Math.abs(memory[bestFitIndex]);
    if (blockSize === size) {
      // Block size matches the requested size exactly
      memory[bestFitIndex] = -size;
    } else {
      // Split the block into allocated andfree parts

      memory.splice(bestFitIndex, 0, -size, blockSize - size);
      memory.splice(bestFitIndex + 2, 1);
    }
    return true;
  }
  return false; // Allocation failed
}

function allocateWorstFit(size) {
  let worstFitIndex = -1;
  let maxFragmentation = -Infinity;

  for (let i = 0; i < memory.length; i++) {
    if (memory[i] < 0 && Math.abs(memory[i]) >= size) {
      const fragmentation = Math.abs(memory[i]) - size;
      if (fragmentation > maxFragmentation) {
        maxFragmentation = fragmentation;
        worstFitIndex = i;
      }
    }
  }

  if (worstFitIndex !== -1) {
    // Allocate the block
    const blockSize = Math.abs(memory[worstFitIndex]);
    if (blockSize === size) {
      // Block size matches the requested size exactly
      memory[worstFitIndex] = -size;
    } else {
      // Split the block into allocated and free parts
      memory.splice(worstFitIndex, 0, -size, blockSize - size);
      memory.splice(worstFitIndex + 2, 1);
    }
    return true;
  }
  return false; // Allocation failed
}

function calculateMemoryUtilization() {
  let totalAllocatedSpace = 0;
  for (let i = 0; i < memory.length; i++) {
    if (memory[i] < 0) {
      totalAllocatedSpace += Math.abs(memory[i]);
    }
  }
  return totalAllocatedSpace / memory.length;
}

// Function to simulate memory allocation requests
function simulateMemoryAllocation( requestSize , strategy) {
  let searchTime = 0;
  let totalMemoryUtilization = 0;

  // Reset memory and next-fit index
    nextFitIndex = 0;
    let allocated = false;

    // Perform allocation based on the selected strategy
    switch (strategy) {
      case 1 :
        allocated = allocateFirstFit(requestSize);
        break;
      case 2:
        allocated = allocateNextFit(requestSize);
        break;
      case 3:
        allocated = allocateBestFit(requestSize);
        break;
      case 4:
        allocated = allocateWorstFit(requestSize);
        break;
      default:
        console.log('Invalid allocation strategy');
        return;
    }

    if (allocated) {
      displayMemory("after");
    } else {
      console.log(`Allocation failed for request size ${requestSize}`);
    }
  }

  

  var allocationRequests = parseInt(prompt("please enter the size of the data : "));
  var allocationStrategy = parseInt(prompt("please enter the number of memory allocation type to enter the data :1 :first-fit 2 : next-fit 3 : best-fit 4: worst-fit :  ") );
  simulateMemoryAllocation(allocationRequests , allocationStrategy);
