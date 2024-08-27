export function getMergeSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1; 
 
    while (i <= middleIdx && j <= endIdx) {
        animations.push(["compareA", i, j]);
        animations.push(["compareB", i, j]);
        
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push(["overwrite", k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push(["overwrite", k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push(["compareA", i, i]);
        animations.push(["compareB", i, i]);
     
        animations.push(["overwrite", k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push(["compareA", j, j]);
        animations.push(["compareB", j, j]);
  
        animations.push(["overwrite", k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }

    for (let i = startIdx; i <= endIdx; i++) {
        animations.push(["sorted", i]);
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function quickSortHelper(mainArray, low, high, auxiliaryArray, animations) {
    if (low >= high) {
        if (low === high) {
            animations.push(["sorted", low]);
        }
        return;
    } 
    const pivot = doPartition(mainArray, low, high, auxiliaryArray, animations);
    animations.push(["sorted", pivot]);
    quickSortHelper(auxiliaryArray, low, pivot - 1, mainArray, animations);
    quickSortHelper(auxiliaryArray, pivot + 1, high, mainArray, animations);
}

function doPartition(mainArray, low, high, auxiliaryArray, animations) {
    const pivot = mainArray[high];
    let index = low;
   
    for (let i = low; i < high; i++) {
        if (auxiliaryArray[i] < pivot) {
            animations.push(["compareA", i, index]);
            animations.push(["compareB", i, index]);
            animations.push([i, auxiliaryArray[index]]);
            animations.push([index, auxiliaryArray[i]]);

            [mainArray[i], mainArray[index]] = [mainArray[index], mainArray[i]];
            [auxiliaryArray[i], auxiliaryArray[index]] = [auxiliaryArray[index], auxiliaryArray[i]];
            index++;
        }
    }
    animations.push(["compareA", index, high]);
    animations.push(["compareB", index, high]);
    animations.push([index, auxiliaryArray[high]]);
    animations.push([high, auxiliaryArray[index]]);

    [mainArray[index], mainArray[high]] = [mainArray[high], mainArray[index]];
    [auxiliaryArray[index], auxiliaryArray[high]] = [auxiliaryArray[high], auxiliaryArray[index]];

    return index;
}

export function getHeapSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    heapSortHelper(array, auxiliaryArray, animations);
    return animations;
}

function heapSortHelper(mainArray, auxiliaryArray, animations) {
    let N = mainArray.length;
    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
        heapify(mainArray, i, N, auxiliaryArray, animations);
    }

    for (let i = N - 1; i > 0; i--) {
        animations.push(["compareA", 0, i]);
        animations.push(["compareA", 0, i]);
        animations.push([0, auxiliaryArray[i]]);
        animations.push([i, auxiliaryArray[0]]);

        [mainArray[0], mainArray[i]] = [mainArray[i], mainArray[0]];
        [auxiliaryArray[0], auxiliaryArray[i]] = [auxiliaryArray[i], auxiliaryArray[0]];

        N--;
        heapify(mainArray, 0, N, auxiliaryArray, animations);
    }
}

function heapify(mainArray, i, N, auxiliaryArray, animations) {
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;
    let parent = i;

    if (leftChild < N && auxiliaryArray[leftChild] > auxiliaryArray[parent]) {
        parent = leftChild;
    }

    if (rightChild < N && auxiliaryArray[rightChild] > auxiliaryArray[parent]) {
        parent = rightChild;
    }
    
    if(parent !== i) {
        animations.push(["compareA", i, parent]);
        animations.push(["compareB", i, parent]);
        animations.push([i, auxiliaryArray[parent]]);
        animations.push([parent, auxiliaryArray[i]]);

        [mainArray[i], mainArray[parent]] = [mainArray[parent], mainArray[i]];
        [auxiliaryArray[i], auxiliaryArray[parent]] = [auxiliaryArray[parent], auxiliaryArray[i]];

        heapify(mainArray, parent, N, auxiliaryArray, animations);
    }
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    bubbleSort(array, auxiliaryArray, animations);
    return animations;
}
    
function bubbleSort(mainArray, auxiliaryArray, animations) {
    let sorted = true;
    let end = mainArray.length - 1;
    while(sorted) {
        sorted = false;
        for(let i = 0; i < end; i++) {
            animations.push(["compareA", i, i + 1]);
            animations.push(["compareB", i, i + 1]);
                
            if(auxiliaryArray[i] > auxiliaryArray[i + 1]) {
                animations.push(["compareA", i, i + 1]);
                animations.push(["compareB", i, i + 1]);
                animations.push([i, auxiliaryArray[i + 1]]);
                animations.push([i + 1, auxiliaryArray[i]]);
    
                [mainArray[i], mainArray[i + 1]] = [mainArray[i + 1], mainArray[i]];
                [auxiliaryArray[i], auxiliaryArray[i + 1]] = [auxiliaryArray[i + 1], auxiliaryArray[i]];
                sorted = true;
            } 
        }
        animations.push(["sorted", end]);
        end--;
    }
    for(end; end >= 0; end--) {
        animations.push(["sorted", end]);
    }
}