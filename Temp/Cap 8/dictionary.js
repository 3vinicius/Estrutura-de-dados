/* eslint-disable */

function defaultToString(item) {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined){
    return 'UNDEFINED'
  } else if( typeof item === 'string' || item instanceof String) {
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

export class Dictionary {
  constructor(toStrFn = defaultToString){
    this.toStrFn = toStrFn;
    this.table = {}
  }

  hasKey(key){
    return this.table[key] != null;
  }

  set(key, value){
    if(key != null && value != null){
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value)
      return true;
    }
    return false;
  }

  remove(key,toArray){
    if(this.hasKey(key)){
      delete this.table[ this.toStrFn(key)]
      return true
    }
    return false
  }

  get(key, toArray = false){
    if (toArray && this.hasKey(key)){
      return this.table[this.toStrFn(key)]
    } else {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  }

  keyValues(){
    return Object.values(this.table)
  }

  keys(){
    return this.keyValues().map(e => e.key)
  }

  values(){
    return this.keyValues().map(e => e.value)
  }

  forEach(Callbeack){
    const values = this.keyValues();
    for (const v of values) {
      const result = Callbeack(v.key, v.value)
      if (result === false){
        break;
      }
    }
  }

  size(){
    return this.keyValues().length;
  }

  isEmpy(){
    return this.size() == 0;
  }

  clear(){
    this.table = {};
  }

  toString(){
    if(this.isEmpy()){
      return '';
    }
    const values = this.keyValues();
    console.log(values[0])
    let stringValues = `#${values[0].key}: ${values[0].value} `;
    for(let i = 1; i<values.length; i++){
      stringValues += `, #${values[i].key}: ${values[i].value} `
    }
    return stringValues;
  }
}










// const dict = new Dictionary();
// dict.set('Gandalf', 'gandalf@gmail.com')
// dict.set('John', 'JohnSnow@gmail.com')
// dict.set('Tyrion', 'Tyrion@gmail.com')

// console.log(dict.hasKey('Gandalf'))
// console.log(dict.size())
// console.log(dict.keys())
// console.log(dict.values())
// console.log(dict.get('Tyrion'))
// console.log(dict.remove('John'))
// console.log(dict.keys())
// console.log(dict.values())
// console.log(dict.keyValues())

// dict.forEach((x,y) => console.log(x,y))


// dict.forEach((x,y) => {
//   if(y%2 == 0){
//       return false
//   } else {
//     console.log(x,y)
//   }
// })

// ;
// console.log(dict.keys())
// console.log(dict.values())

// for (const iterator of Object.values(dict.table)) {
//   console.log(iterator.key)
// }

// for (const key in dict.table) {
//   console.log(key)
// }

// Object.values(dict.table).forEach(e => console.log(e.value))

