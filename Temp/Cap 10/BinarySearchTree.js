/* eslint-disable*/

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

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree{
  constructor(compareFn = defaultCompare){
    this.compareFn = compareFn;
    this.root = null
  }
  insert(key){
    if(this.root == null){
      this.root = new Node(key);
    } else {
      this.insertNode(this.root,key);
    }
  }
  insertNode(node,key){
    if(this.compareFn(key, node.key) == Compare.LESS_THAN ){
      if(node.left == null){
        node.left = new Node(key);
      } else {
        this.insertNode(node.left,key);
      }
    }
    if(this.compareFn(key, node.key) == Compare.BIGGER_THAN ){
      if(node.right == null){
        node.right = new Node(key);
      } else {
        this.insertNode(node.right,key);
      }
    }
  }
  preOrderTraverse(node = this.root){
    if(node.left == null){
      console.log(node.key)

    } else {
      this.preOrderTraverse(node.left);
      console.log(node.key)
      if(node.right != null){
        console.log(node.right.key)
        this.preOrderTraverse(node.right);
      }
    }
  }
}

const tree = new BinarySearchTree();

tree.insert(3)
tree.insert(1);
tree.insert(0);
tree.insert(10);
tree.insert(-10);
tree.insert(2)
tree.insert(25);
tree.insert(20);

console.log(tree.root);
tree.preOrderTraverse()
