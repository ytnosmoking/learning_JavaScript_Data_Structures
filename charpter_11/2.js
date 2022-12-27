// 堆排序算法

const { defaultCompare, swap, Compare } = require('./1');

function heapify(array, index, size, compareFn) {
  let element = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  if (
    left < size &&
    compareFn(array[element], array[left]) === Compare.BIGGER_THAN
  ) {
    element = left;
  }
  if (
    right < size &&
    compareFn(array[element], array[right]) === Compare.BIGGER_THAN
  ) {
    element = right;
  }
  if (index !== element) {
    swap(array, index, element);
    heapify(array, element, size, compareFn);
  }
}

function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  while (heapSize > 1) {
    swap(array, 0, --heapSize);
    heapify(array, 0, heapSize, compareFn);
  }
  return array;
}

function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}

const array = [1, 6, 3, 2, 5, 4, 7];
console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));
