/**
 * This is a basic implementation of the Bubble Sort Sorting Algorithm.
 * 
 * Basics:
 * 1) The list/array is traversed and every pair of adjacent values is compared. If the first value is 
 * greater than the second value, we swap them. 
 * 
 * Thus each time the array/list is traversed, the largest value will 'bubble' to the top.
 * 
 * 2) Once the final list is sorted, we will always need to traverse it one more time to make sure.
 * 
 * 3) Runs on average in O(n^2) time.
 * 
 */
let bubbleSort = (inputArray) => {
    //Define the length of the array
    let len = inputArray.length

    //Loop through the entire array 'for every element'
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {
            //If the value is greater than the value ahead of it, then swap them (temp is for readability)
            if(inputArray[j] > inputArray[j + 1]) {
                let temp = inputArray[j];
                inputArray[j] = inputArray[j + 1];
                inputArray[j + 1] = temp;
            }
        }
    }

    return inputArray;
}