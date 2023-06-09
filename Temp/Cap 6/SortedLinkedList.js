/* eslint-disable */

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}
class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

function defaultEquals(a, b) {
  return a === b;
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      // catches null && undefined
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  clear() {
    this.head = undefined;
    this.count = 0;
  }

  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

const compare = {
  Less_than: -1,
  Bigger_than: 1,
}

function defaultCompare(a,b){
  if(a==b){
    return 0;
  }
  return a < b ? compare.Less_than : compare.Bigger_than;
}

class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare){
    super(equalsFn)
    this.compareFn = compareFn
  }

  insert(element, index = 0){
    const node = new Node(element)
    if(this.isEmpty()){
      return super.insert(element,0)
    }
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element,pos)
  }

  getIndexNextSortedElement(element){
    let current = this.head;
    let i = 0
    for(; i < this.size() && current ; i++){
      const comp = this.compareFn(element, current.element)
      console.log(comp)
      if (comp === compare.Less_than){
        return i;
      }
      console.log(i)
      current = current.next
    }
    return i;
  }
};


const list = new SortedLinkedList()
list.insert(4,0)
list.insert(6,1)
list.insert(3,2)
list.insert(7,3)
list.insert(6,4)
list.insert(2,5)
list.insert(1,2)
console.log(list)
