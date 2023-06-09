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



function defaultToString(item) {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined){
    return 'UNDEFINED'
  } else if( typeof items === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value){
    this.key = key;
    this.value = value;
  }

  toString(){
    return `[#${this.key}: ${this.value}]`
  }
}


class HashTable{
  constructor(toStrFn = defaultToString){
    this.toStrFn = toStrFn;
    this.table = {};
  }

  hashCode(key){
    return this.loseloseHashCode(key);
  }

  loseloseHashCode(key){
    if (typeof key === 'number'){
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for(let i = 0; i < tableKey.length ; i++){
      hash += tableKey.charCodeAt(i);
    }
    return hash%37;
  }

  put(key, value){
    if(key != null && value != null){
      const position = this.hashCode(key);
      if(this.table[position] == null){
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key,value));
      return true
    }
    return false
  }

  get(key){
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if(linkedList != null && !linkedList.isEmpty()){
      let current = linkedList.getHead();
      while (current != null) {
        if(current.element.key === key){
          return current.element.value;
        }
        current = current.next
      }
    }
    return undefined;
  }

  remove(key){
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if(linkedList != null && !linkedList.isEmpty()){
      let current = linkedList.getHead();

      while(current != null){
        if(current.element.key === key){
          linkedList.remove(current.element)
          if(linkedList.isEmpty()){
            delete this.table[position];
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }

  toString(){
    if(Object.values(this.table).length == 0){
      return ''
    }
    const keys = Object.keys(this.table);
    let objString = `${keys[0]} => ${this.table[keys[0]].toString()}`
    for (let i = 1; i < keys.length; i++) {
      objString +=`,${keys[i]} => ${this.table[keys[i]].toString()}`
    }
    return objString;
  }
}

const jsonDates = async() => {
  const dates = await fetch('http://localhost:1337/api/pages?populate[sections][populate]=*')
  const json = await dates.json()
  console.log(JSON.stringify(json.data[0]))
  console.log(JSON.parse(JSON.stringify(json.data[0].attributes)))
}

jsonDates()

// const myHash = new HashTable()

// myHash.put('Ygritte',98769)
// myHash.put('jonathan',797869)
// myHash.put('jamie',497869)
// myHash.put('jack',397869)
// myHash.put('sue',797869)
// myHash.put('Nathan',597869)
// myHash.put('Athelstan',7897869)
// myHash.put('Aethelwuf', 32132424)

// console.log(myHash.remove('jonathan'))
// console.log(myHash.toString())


