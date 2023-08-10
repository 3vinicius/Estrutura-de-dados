/* eslint-disable */

function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  hasKey(key) {
    return this.table[key] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key, toArray) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  get(key, toArray = false) {
    if (toArray && this.hasKey(key)) {
      return this.table[this.toStrFn(key)];
    } else {
      const valuePair = this.table[this.toStrFn(key)];
      return valuePair == null ? undefined : valuePair.value;
    }
  }

  keyValues() {
    return Object.values(this.table);
  }

  keys() {
    return this.keyValues().map((e) => e.key);
  }

  values() {
    return this.keyValues().map((e) => e.value);
  }

  forEach(Callbeack) {
    const values = this.keyValues();
    for (const v of values) {
      const result = Callbeack(v.key, v.value);
      if (result === false) {
        break;
      }
    }
  }

  size() {
    return this.keyValues().length;
  }

  isEmpy() {
    return this.size() == 0;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpy()) {
      return "";
    }
    const values = this.keyValues();
    console.log(values[0]);
    let stringValues = `#${values[0].key}: ${values[0].value} `;
    for (let i = 1; i < values.length; i++) {
      stringValues += `, #${values[i].key}: ${values[i].value} `;
    }
    return stringValues;
  }
}

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Dictionary();
  }

  addVetex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVetex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVetex(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} => `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]}`
      }
      s +=`\n`;
    }
    return s
  }
}

const graph = new Graph();
const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVetex(myVertices[i]);
}


graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph.toString());
