/**
 * This is a basic implementation of the Insertion Sort Sorting Algorithm.
 * 
 * Basics:
 * 1) The list/array is traversed, one element at a time and it inserts the current element into the location that 
 * it belongs to in the sorted section of the list.
 * 
 * 3) Runs on average in O(n^2) time. 
 * 
 */

 let insertionSort = (inputArray) => {
     let len = inputArray.length;

     for(let i = 0; i < len; i++) {
         let key = inputArray[i];
         let j = i - 1;

         while(j >= 0 && inputArray[j] > key) {
             inputArray[j + 1] = inputArray[i];
             j = j - 1;
         }
         inputArray[j + 1] = key;
     }
     return inputArray;
 }