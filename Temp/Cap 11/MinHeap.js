
const Compare = {
  EQUALS: 0,
  LESS_THAN: -1,
  BIGGER_THAN:1,

}

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


class MinHeap {
  constructor(compareFn = defaultCompare){
    this.compareFn = compareFn;
    this.heap = []
  }

  getLeftIndex(index){
    return 2 * index + 1
  }

  getRightIndex(index){
    return 2 * index + 2
  }

  getParentIndex(index){
    if(index == 0){
      return undefined
    }
    return Math.floor((index-1)/2)
  }

  insert(value) {
    if(value != null){
      this.heap.push(value);
      this.siftUp(this.heap.length - 1)
      return true;
    }
    return false
  }

  swap(array, parent, index) {
    const temp = array[parent]
    array[parent] = array[index]
    array[index] = temp
  }

  siftUp(index) {
    let parent = this.getParentIndex(index);
    while(index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
        this.swap(this.heap,parent,index)
        index = parent
        parent = this.getParentIndex(index)
      }
  }

  size(){
    return this.heap.length;
  }

  isEmpy(){
    return this.size() === 0
  }

  findMinimum(){
    return this.isEmpy() ? undefined : this.heap[0]
  }

  extract(){
    if (this.isEmpy()){
      return undefined;
    }
    if(this.size == 1){
      return this.heap.shift()
    }
    const removedValue = this.heap.shift()
    this.siftDown(0);
    return removedValue;
  }

  siftDown(index){}
}


const heap = new MinHeap();

heap.insert(2)
heap.insert(3)
heap.insert(4)
heap.insert(5)
heap.insert(1)

console.log(heap)
console.log(heap.size())
console.log(heap.isEmpy())
console.log(heap.findMinimum())


