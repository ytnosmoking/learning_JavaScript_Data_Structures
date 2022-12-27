// 冒泡排序

const { defaultCompare, Compare } = require('../utils/index');
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

function bubbleSort(array, compareFn = defaultCompare) {
  let count = 0;
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      count++;
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  console.log(`bubblesort count ====${count}`);
  return array;
}

function createNonSortedArray(size) {
  // 6
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}

function modifiedBubbleSort(array, compareFn = defaultCompare) {
  const { length } = array;
  let count = 0;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      count++;
      // {1}
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  console.log(`modifiedbubblesort count ====${count}`);
  return array;
}

const num = 20;
let array1 = createNonSortedArray(num); // {7}
let array2 = createNonSortedArray(num); // {7}
console.log('arrary1', array1.join()); // {8}
array1 = bubbleSort(array1); // {9}
console.log('arrary1', array1.join()); // {8}
console.log('arrary2', array2.join()); // {8}
array2 = modifiedBubbleSort(array2); // {9}
console.log('arrary2', array2.join()); // {8}

// 选择排序

function selectionSort(array, compareFn = defaultCompare) {
  let count = 0;
  const { length } = array;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i + 1; j < length; j++) {
      count++;
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      swap(array, i, indexMin);
    }
  }
  console.log(`selectionSort count ====${count}`);
  return array;
}

let array3 = createNonSortedArray(num);
console.log('array3', array3.join());
array3 = selectionSort(array3);
console.log('array3', array3.join());

// 插入
function insertionSort(array, compareFn = defaultCompare) {
  const { length } = array; // {1}
  let temp;
  let count = 0;
  for (let i = 1; i < length; i++) {
    // {2}
    let j = i; // {3}
    temp = array[i]; // {4} 临时值 记录
    // 循环 拿前一个值 与当前值比较
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      count++;
      // {5}
      array[j] = array[j - 1]; // {6}
      j--;
    }
    array[j] = temp; // {7}
  }
  console.log(`insertionSort count ===${count}`);
  return array;
}

console.log(' ---  插入  --- ');
let array4 = createNonSortedArray(num);
console.log('array4', array4.join());
array4 = insertionSort(array4);
console.log('array4', array4.join());

// 归并排序

function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}

function merge(left, right, compareFn) {
  let [i, j] = [0, 0];
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(
      compareFn(left[i], right[j]) === Compare.LESS_THAN
        ? left[i++]
        : right[j++]
    );
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

console.log(' ---  归并排序  --- ');
let array5 = createNonSortedArray(num);
console.log('array5', array5.join());
array5 = mergeSort(array5);
console.log('array5', array5.join());

// 快速排序

function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}

function quick(array, left, right, compareFn) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, compareFn);
    if (left < index - 1) {
      quick(array, left, index - 1, compareFn);
    }
    if (index < right) {
      quick(array, index, right, compareFn);
    }
  }
  return array;
}

function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((right + left) / 2)];
  let [i, j] = [left, right];
  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++;
    }
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

// 计数排序
function counttingSort(array) {
  if (array.length < 2) {
    return array;
  }

  const maxValue = Math.max(...array);
  const counts = new Array(maxValue + 1);
  array.forEach(element => {
    if (!counts[element]) {
      // {4}
      counts[element] = 0;
    }
    counts[element]++; // {5}
  });
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      // {6}
      array[sortedIndex++] = i; // {7}
      count--; // {8}
    }
  });
  return array;
}

console.log('计数排序');
console.log(counttingSort([5, 4, 5, 3, 2, 1]));

// 桶排序

function bucketSort(array, bucketSize = 5) {
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize);
  return sortBuckets(buckets);
}

// function createBuckets(array, bucketSize) {
//   let minValue = array[0];
//   let maxValue = array[0];
//   for (let i = 1; i < array.length; i++) {
//     // {4}
//     if (array[i] < minValue) {
//       minValue = array[i];
//     } else if (array[i] > maxValue) {
//       maxValue = array[i];
//     }
//   }
//   const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // {5}
//   const buckets = [];
//   for (let i = 0; i < bucketCount; i++) {
//     // {6}
//     buckets[i] = [];
//   }
//   for (let i = 0; i < array.length; i++) {
//     // {7}
//     const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); // {8}
//     buckets[bucketIndex].push(array[i]);
//   }
//   return buckets;
// }
function createBuckets(array, bucketSize) {
  const minValue = Math.min(...array);
  const maxValue = Math.max(...array);
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  // const buckets = Array(bucketCount).fill([]);
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) {
    // {6}
    buckets[i] = [];
  }
  console.log('bucketCount');
  console.log(bucketCount);
  console.log('buckets');
  console.log(buckets);
  for (let i = 0; i < array.length; i++) {
    // {7}
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); // {8}
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

function sortBuckets(buckets) {
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      insertionSort(buckets[i]); // {11}
      sortedArray.push(...buckets[i]); // {12}
    }
  }
  return sortedArray;
}
console.log('桶排序');
console.log(bucketSort([5, 2, 1, 3, 66, 7, 3, 23]));

// 基数排序

// 顺序搜索

// 二分搜索
const DOES_NOT_EXIST = -1;
function binarySearch(array, value, compareFn = defaultCompare) {
  const sortedArray = quickSort(array);
  let [low, high] = [0, sortedArray.length - 1];
  while (lesserOrEquals(low, high, compareFn)) {
    const mid = Math.floor((low + high) / 2);
    const element = sortedArray[mid];
    if (compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1;
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return DOES_NOT_EXIST;
}

function lesserOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

// 内插搜索

// 随机算法

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }
}
console.log('随机算法');
const a1 = [1, 2, 3, 4, 5, 6];
shuffle(a1);
console.log(a1);
