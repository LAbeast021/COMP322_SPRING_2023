// Define the memory array
let memory = [];

// Function to initialize the memory with a given size
function initializeMemory(size) {
  memory = [size];
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

// Function to allocate memory using the next-fit strategy
let nextFitIndex = 0;

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

// Function to allocate memory using the best-fit strategy
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

// Function to allocate memory using the worst-fit strategy
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

// Function to calculate memory utilization
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
function simulateMemoryAllocation(requests, strategy) {
  let searchTime = 0;
  let totalMemoryUtilization = 0;

  // Reset memory and next-fit index
  initializeMemory(1024);
  nextFitIndex = 0;

  for (let i = 0; i < requests.length; i++) {
    const requestSize = requests[i];
    let allocated = false;

    // Perform allocation based on the selected strategy
    switch (strategy) {
      case 'first-fit':
        allocated = allocateFirstFit(requestSize);
        break;
      case 'next-fit':
        allocated = allocateNextFit(requestSize);
        break;
      case 'best-fit':
        allocated = allocateBestFit(requestSize);
        break;
      case 'worst-fit':
        allocated = allocateWorstFit(requestSize);
        break;
      default:
        console.log('Invalid allocation strategy');
        return;
    }

    if (allocated) {
      totalMemoryUtilization += calculateMemoryUtilization();
    } else {
      console.log(`Allocation failed for request size ${requestSize}`);
    }

    searchTime++; // Increment search time
  }

  const averageMemoryUtilization = totalMemoryUtilization / requests.length;
  const averageSearchTime = searchTime / requests.length;

  console.log(`Average Memory Utilization: ${averageMemoryUtilization}`);
  console.log(`Average Search Time: ${averageSearchTime}`);
}

// Run the simulation with example requests and strategies
const allocationRequests = [32, 64, 128, 256];
const allocationStrategy = 'first-fit';

simulateMemoryAllocation(allocationRequests, allocationStrategy);
