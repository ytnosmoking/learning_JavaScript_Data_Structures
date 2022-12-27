const { defaultCompare, Compare } = require('../charpter_10/1.js');

function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  getLeftIndex(index) {
    return 2 * index + 1;
  }

  getRightIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    // return this.heap.length === 0;
    return this.size() <= 0;
  }

  clear() {
    this.heap = [];
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  extarct() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }

  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) ===
        Compare.BIGGER_THAN
    ) {
      element = left;
    }
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) ===
        Compare.BIGGER_THAN
    ) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
}

const heap = new MinHeap();
console.log('---------min ------ heap');
// heap.insert(2);
// heap.insert(3);
// heap.insert(4);
// heap.insert(5);
// console.log(heap);
// heap.insert(1);
// console.log(heap);
// console.log('Heap size: ', heap.size()); // 5
// console.log('Heap is empty: ', heap.isEmpty()); // false
// console.log('Heap min value: ', heap.findMinimum()); // 1
heap.insert(5);
heap.insert(4);
heap.insert(3);
heap.insert(2);
console.log(heap);

console.log('Heap size: ', heap.size()); // 5
console.log('Heap is empty: ', heap.isEmpty()); // false
console.log('Heap min value: ', heap.findMinimum()); // 1
console.log('Heap min extract: ', heap.extarct()); //
// console.log('heap.getLeftIndex');
// console.log(heap.getLeftIndex(0));
// console.log(heap.getLeftIndex(1));
// console.log(heap.getLeftIndex(2));
// console.log(heap.getLeftIndex(3));
// console.log('heap.getRightIndex');
// console.log(heap.getRightIndex(0));
// console.log(heap.getRightIndex(1));
// console.log(heap.getRightIndex(2));
// console.log(heap.getRightIndex(3));

function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = reverseCompare(compareFn);
  }
}

console.log('------ max ----heap');
const maxHeap = new MaxHeap();
maxHeap.insert(2);
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(5);

maxHeap.insert(1);

console.log(`Heap Size: ${maxHeap.size()}`);
console.log(`Head min Value: ${maxHeap.findMinimum()}`);

module.exports = {
  swap,
  defaultCompare,
  Compare
};
