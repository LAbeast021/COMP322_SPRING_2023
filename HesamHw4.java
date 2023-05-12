import java.util.*;

import java.io.*;

//The main class

public class HesamHw4 {

        public static void main(String[] args) {

                Scanner input = new Scanner(System.in);
                BankerAlgorithm algorithm = new BankerAlgorithm();
                algorithm.initializeState();
                System.out.println("System initial state is: \n" + algorithm);
                char answer = 'y';

                do {
                        System.out.println("Enter your next command in form request(x, y, n) or release(x, y, n): ");
                        String command[] = input.nextLine().split("\\(|,|\\)");
                        int x = Integer.parseInt(command[1].trim());
                        int y = Integer.parseInt(command[2].trim());
                        int n = Integer.parseInt(command[3].trim());
                        if (command[0].trim().toLowerCase().equals("request")){
                                if (!algorithm.request(x, y, n)){
                                        System.out.println("The request was rejected.");
                                }
                                else{
                                        System.out.println("The request was approved.");
                                }
                        }
                        else if (command[0].trim().toLowerCase().equals("release")){
                                algorithm.release(x, y, n);
                        }
                        else{
                                System.out.println("Wrong command format.");
                        }
                        System.out.println("System's current state is: \n" + algorithm);
                        System.out.println("Would you like to do another test? Y/N: ");
                        answer = input.nextLine().toUpperCase().charAt(0);
                } while (answer == 'Y');
                System.out.println("Using the banker's algorithm, deadlock is avoided.");
        }
}
class BankerAlgorithm {
        protected int number_of_processes; // how many processes
        protected int number_of_resources; // how many resources
        protected int[] resources_available; // how many resources are available for
                                             // each type
        protected int[][] max_requests; // the maximum requests each process makes
                                        // for each resource
        protected int[][] current_allocation; // current allocation
        // default constructor
        public BankerAlgorithm() {
        };
        // constructor
        public BankerAlgorithm(int number_of_processes, int number_of_resources, int[] resources_available,
                        int[][] max_requests, int[][] current_allocation)
        {
                this.number_of_processes = number_of_processes;
                this.number_of_resources = number_of_resources;
                this.resources_available = resources_available;
                this.max_requests = max_requests;
                this.current_allocation = current_allocation;
        }
        public boolean isStateSafe(){
                int x, y;
                int[] free = new int[number_of_resources];
                for (x = 0; x < number_of_resources; x++){
                        free[x] = resources_available[x];
                }
                // process finished?
                boolean[] is_finished = new boolean[number_of_processes];
                // NOT NEEDED??
                for (x = 0; x < number_of_processes; x++){
                        is_finished[x] = false;
                }
                boolean remove_one = false;
                // to control the following loop
                int count = number_of_processes;
                // do-while loop
                do{
                        remove_one = false;
                        // can the process be removed?
                        for (x = 0; x < number_of_processes && !remove_one; x++) {
                                if (!is_finished[x] && needLess(x, free)){
                                        is_finished[x] = true; // the x'th process can be finished
                                        // release x's resource
                                        for (y = 0; y < number_of_resources; y++){
                                                free[y] += current_allocation[x][y];
                                        }
                                        remove_one = true; // one process can be reduced
                                }
                        }
                        count--;
                } while (count > 0 && remove_one);
                for (x = 0; x < number_of_processes; x++){
                        if (!is_finished[x]){
                                return false;
                        }
                }
                // all the processes are finished
                return true;
        }// end of isSafeState
        // can all requests of process p be granted, or not
        private boolean needLess(int process, int[] free){
                // if one of the needed resources isn't available, return false
                for (int x = 0; x < number_of_resources; x++){
                        if (max_requests[process][x] - current_allocation[process][x] > free[x]){
                                return false;
                        }
                }
                return true;
        }
        public boolean request(int process, int resource, int amount){
                // are there enough resources available? If no, reject
                if (resources_available[resource] < amount){
                        return false;
                }
                // if there is a request for more than what's needed, reject
                if (max_requests[process][resource] - current_allocation[process][resource] < amount){
                        return false;
                }
                // update resources available
                resources_available[resource] -= amount;
                // update the current allocation
                current_allocation[process][resource] += amount;
                System.out.println("Allocation is " + current_allocation[process][resource]);
                // if safe, return true
                if (isStateSafe()){
                        return true;
                }
                // otherwise, reverse the temporary grant and return false
                release(process, resource, amount);
                return false;
        }
        public void release(int process, int resource, int amount){
                resources_available[resource] += amount;
                current_allocation[process][resource] -= amount;
        }
        public void initializeState(){
                Scanner input = new Scanner(System.in);
                System.out.print("Enter the number of processes: ");
                int amount_of_processes = input.nextInt();
                System.out.println();
                System.out.print("Enter the number of resources: ");
                int amount_of_resources = input.nextInt();
                System.out.println();
                int[] resource = new int[amount_of_resources];
                System.out.print("Enter the number of each resource, separated by a white space: ");
                int x, y;
                for (x = 0; x < amount_of_resources; x++){
                        resource[x] = input.nextInt();
                }
                System.out.println();
                System.out.println("Enter claim matrix: ");
                int[][] claim_matrix = new int[amount_of_processes][amount_of_resources];
                for (x = 0; x < amount_of_processes; x++){
                        System.out.println("Enter the maxmimum claim of process " + x +
                                        " for each resource separated by white space:\n");
                        for (y = 0; y < amount_of_resources; y++){
                                claim_matrix[x][y] = input.nextInt();
                        }
                }
                number_of_processes = amount_of_processes;
                number_of_resources = amount_of_resources;
                resources_available = resource;
                max_requests = claim_matrix;
                current_allocation = new int[number_of_processes][number_of_resources];
        }
        public void initializeState(String file_name){
                try{
                        File file = new File(file_name);
                        Scanner input = new Scanner(file);
                        number_of_processes = input.nextInt();
                        number_of_resources = input.nextInt();
                        resources_available = new int[number_of_resources];
                        for (int x = 0; x < number_of_resources; x++){
                                resources_available[x] = input.nextInt();
                        }
                        max_requests = new int[number_of_processes][number_of_resources];
                        for (int x = 0; x < number_of_processes; x++){
                                for (int y = 0; y < number_of_resources; y++){
                                        max_requests[x][y] = input.nextInt();
                                }
                        }
                        current_allocation = new int[number_of_processes][number_of_resources];
                }
                catch (Exception e){
                        e.printStackTrace();
                }
        }
        public String toString(){
                String result = "Claim Matrix: \n";
                int x, y;
                for (x = 0; x < number_of_processes; x++){
                        for (y = 0; y < number_of_resources; y++){
                                result = result + "\t" + max_requests[x][y];
                        }
                        result += "\n";
                }
                result += "\nAllocation Matrix: \n";
                for (x = 0; x < number_of_processes; x++){
                        for (y = 0; y < number_of_resources; y++){
                                result = result + "\t" + current_allocation[x][y];
                        }
                        result += "\n";
                }
                result += "\nAvailable Resources:\n";
                for (x = 0; x < number_of_resources; x++) {
                        result += "\t" + resources_available[x];
                }
                return result;
        }
}
