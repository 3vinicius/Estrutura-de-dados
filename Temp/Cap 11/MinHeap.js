function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

const Compare = {
  EQUALS: 0,
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  getLefti(i) {
    return 2 * i + 1;
  }

  getRighti(i) {
    return 2 * i + 2;
  }

  getParenti(i) {
    if (i == 0) {
      return undefined;
    }
    return Math.floor((i - 1) / 2);
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  swap(array, parent, i) {
    const temp = array[parent];
    array[parent] = array[i];
    array[i] = temp;
  }

  siftUp(i) {
    let parent = this.getParenti(i);
    while (
      i > 0 &&
      this.compareFn(this.heap[parent], this.heap[i]) === Compare.BIGGER_THAN
    ) {
      this.swap(this.heap, parent, i);
      i = parent;
      parent = this.getParenti(i);
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpy() {
    return this.size() === 0;
  }

  findMinimum() {
    return this.isEmpy() ? undefined : this.heap[0];
  }

  extract() {
    if (this.isEmpy()) {
      return undefined;
    }
    if (this.size == 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return removedValue;
  }

  siftDown(i) {
    let element = i;
    const right = this.getRighti(i);
    const left = this.getLefti(i);
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
    if (i !== element) {
      this.swap(this.heap, i, element);
      this.siftDown(element);
    }
  }
}

class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = reverseCompare(compareFn);
  }
}

function heapSort(arr) {
  var heap1 = new MaxHeap();
  var sorted = []
  let size = arr.length;
  for (let i = 0; i < size; i++) {
    heap1.insert(arr[i])
  }
  for ( let j = 0; j < size; j++) {
    sorted[j] = heap1.extract()
  }

  arr = sorted;
  return arr;
}

let arr = [4, 9, 79, 24, 5, 88, 23, 254, 78, 76];
console.log(arr);
arr = heapSort(arr);
console.log(arr);
  