/**
 * This is a basic implementation of the Selection Sort Sorting Algorithm.
 * 
 * Basics:
 * 1) The list/array is traversed linearly and we look for the smallest element and insert it into the first position, 
 * then repeat this process for each iteration 
 * 
 * 2) Each subsequent iteration only looks through the 'unsorted' section of the list as the 'section'
 * increases by one with each iteration.
 * 
 * 3) Although it runs in O(n^2) times, it is slightly faster than Bubble Sort as it only does n swaps
 * 
 * 3) Runs on average in O(n^2) time.
 * 
 */

 let selectionSort = (inputArray) => {
     let len = inputArray.length;

     for(let i = 0; i < len; i++) {
         let min = i;

         for(let j = 0; j < len; j++) {
             if(inputArray[min] > inputArray[j]) {
                 min = j;
             }
         }
         if(min !== i) {
             let temp = inputArray[i];
             inputArray[i] = inputArray[min];
             inputArray[min] = temp;
         }
     }

     return inputArray;
 }