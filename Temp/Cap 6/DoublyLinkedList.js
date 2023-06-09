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

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      // This is an case in position 0
      if (index === 0) {
        if(this.head == null){
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
        // This is case in position equal this.count
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next
        node.prev = previous
        previous.next = node
      }
    }
    this.count++
  }



  removeAt(index){
    if(index >= 0 && index < this.count){
      let current = this.head;
      if(index === 0){
        this.head = current.next
        if(this.count === 1){
          this.tail = undefined
        } else {
          this.head.prev = undefined
        }
      } else if(index === this.count - 1){
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      } else {
        current = this.getElementAt(index)
        const previous = current.prev
        previous.next = current.next
        current.next.prev = previous
      }
      this.count--;
      return current.element
    }
    return undefined
  }
}

const list = new DoublyLinkedList()

// list.insert(3,0)
// console.log(list)
// console.log(list.removeAt(0))
list.insert(3,0)
list.insert(7,1)
list.insert(534,2)
list.insert(9,3)
list.insert(8123,4)
console.log(list)
console.log(list.removeAt(3))
console.log(list.removeAt(3))
// default class DoublyLinkedList extends LinkedList {
//   constructor(equalsFn = defaultEquals) {
//     super(equalsFn);
//     this.tail = undefined;
//   }

//   push(element) {
//     const node = new DoublyNode(element);
//     if (this.head == null) {
//       this.head = node;
//       this.tail = node; // NEW
//     } else {
//       // attach to the tail node // NEW
//       this.tail.next = node;
//       node.prev = this.tail;
//       this.tail = node;
//     }
//     this.count++;
//   }

//   insert(element, index) {
//     if (index >= 0 && index <= this.count) {
//       const node = new DoublyNode(element);
//       let current = this.head;
//       if (index === 0) {
//         if (this.head == null) { // NEW
//           this.head = node;
//           this.tail = node; // NEW
//         } else {
//           node.next = this.head;
//           this.head.prev = node; // NEW
//           this.head = node;
//         }
//       } else if (index === this.count) { // last item NEW
//         current = this.tail;
//         current.next = node;
//         node.prev = current;
//         this.tail = node;
//       } else {
//         const previous = this.getElementAt(index - 1);
//         current = previous.next;
//         node.next = current;
//         previous.next = node;
//         current.prev = node; // NEW
//         node.prev = previous; // NEW
//       }
//       this.count++;
//       return true;
//     }
//     return false;
//   }

//   removeAt(index) {
//     if (index >= 0 && index < this.count) {
//       let current = this.head;
//       if (index === 0) {
//         this.head = this.head.next;
//         // if there is only one item, then we update tail as well //NEW
//         if (this.count === 1) {
//           // {2}
//           this.tail = undefined;
//         } else {
//           this.head.prev = undefined;
//         }
//       } else if (index === this.count - 1) {
//         // last item //NEW
//         current = this.tail;
//         this.tail = current.prev;
//         this.tail.next = undefined;
//       } else {
//         current = this.getElementAt(index);
//         const previous = current.prev;
//         // link previous with current's next - skip it to remove
//         previous.next = current.next;
//         current.next.prev = previous; // NEW
//       }
//       this.count--;
//       return current.element;
//     }
//     return undefined;
//   }

//   indexOf(element) {
//     let current = this.head;
//     let index = 0;
//     while (current != null) {
//       if (this.equalsFn(element, current.element)) {
//         return index;
//       }
//       index++;
//       current = current.next;
//     }
//     return -1;
//   }

//   getHead() {
//     return this.head;
//   }

//   getTail() {
//     return this.tail;
//   }

//   clear() {
//     super.clear();
//     this.tail = undefined;
//   }

//   toString() {
//     if (this.head == null) {
//       return '';
//     }
//     let objString = `${this.head.element}`;
//     let current = this.head.next;
//     while (current != null) {
//       objString = `${objString},${current.element}`;
//       current = current.next;
//     }
//     return objString;
//   }

//   inverseToString() {
//     if (this.tail == null) {
//       return '';
//     }
//     let objString = `${this.tail.element}`;
//     let previous = this.tail.prev;
//     while (previous != null) {
//       objString = `${objString},${previous.element}`;
//       previous = previous.prev;
//     }
//     return objString;
//   }
// }
