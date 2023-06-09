/* eslint-disable */

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);


const union = (set1, set2) =>{
  const union = new Set()
  set1.forEach(element => {
    union.add(element)
  });

  set2.forEach(element => {
    union.add(element);
  })

  return union;
}


const inserction = (set1, set2) =>{
  const intersec = new Set()
  let mjor = set1;
  let junior = set2;

  if(set2.size > set1){
    let junior = set1;
    let mjor = set2;
  }

  junior.forEach(element => {
    if(mjor.has(element)){
      intersec.add(element)
    }
  })
  return intersec
};


const difference = (set1, set2) => {
  const differ = new Set();

  let mjor = set1;
  let junior = set2;

  if(set2.size > set1){
    let junior = set1;
    let mjor = set2;
  }

  junior.forEach(element => {
    if(!mjor.has(element)){
      differ.add(element)
    }
  })
  return differ;
}



console.log(difference(setA,setB))

console.log(new Set([...setA,...setB]))

console.log(new Set([...setA].filter(x => setB.has(x))))
console.log(new Set([...setA].filter(x => !setB.has(x))))


// Create my class Set()


// class Set {
//   constructor() {
//     this.items = {};
//     this.count = 0;
//   }

//   add(element) {
//     if (this.has(element)) {
//       return undefined;
//     } else {
//       this.items[element] = element;
//     }
//     this.count++;
//   }

//   delete(element) {
//     if (this.has(element)) {
//       delete this.items[element];
//       this.count--;
//     }
//     return undefined;
//   }

//   has(element) {
//     return element in this.items;
//   }

//   clear(element) {
//     this.items = {};
//   }

//   size() {
//     return Object.keys(this.items).length;
//   }

//   values() {
//     return Object.values(this.items);
//   }

//   sizeLegacy() {
//     let count = 0;
//     for (let key in this.items) {
//       if (this.items.hasOwnProperty(key)) {
//         count++;
//       }
//     }
//     return count;
//   }

//   valuesLegacy() {
//     let values = [];
//     for (let key in this.items) {
//       if (this.items.hasOwnProperty(key)) {
//         values.push(key);
//       }
//     }
//     return values;
//   }

//   union(otherSet) {
//     const unionSet = new Set();
//     otherSet.values().forEach(element => unionSet.add(element));
//     this.values().forEach(element => unionSet.add(element));
//     return unionSet;
//   }

//   intersection(otherSet) {
//     const intersec = new Set();
//     if (otherList.size() < this.size()) {
//       this.values().forEach(element => {
//         if (otherSet.has(element)) {
//           intersec.add(element);
//         }
//       });
//     } else {
//       otherSet.values().forEach(element => {
//         if (this.has(element)) {
//           intersec.add(element);
//         }
//       });
//     }
//     return intersec;
//   }

//   difference(otherSet) {
//     const differ = new Set();
//     this.values().forEach(element => {
//       if (!otherSet.has(element)) {
//         differ.add(element);
//       }
//     });
//     return differ;
//   }

//   isSubSetof(otherSet) {
//     if (this.size() > otherSet.size()) {
//       return false;
//     }
//     let isSubSet = true;
//     this.values().forEach(element => {
//       if (!otherSet.has(element)) {
//         isSubSet = false;
//         return false
//       }
//     });

//     return isSubSet;

//     // let isSubSet = true;
//     // this.values().forEach(element => {
//     //   if (!otherSet.has(element)) {
//     //     isSubSet = false;
//     //   }
//     // });
//   }
// }

// const list = new Set();
// const otherList = new Set();
// const isSub = new Set();

// list.add(1);

// for (let i = 1; i <= 11; i++) {
//   list.add(i * 2);
//   otherList.add(i * 2 - 1);
//   // isSub.add(i*2 + 8)
// }

// isSub.add(2);
// isSub.add(4);
// isSub.add(7);

// console.log(list);
// console.log(otherList);

// list.add(100);
// otherList.add(100);

// // console.log(list.isSubSetof(otherList));
// console.log(isSub.isSubSetof(list));


