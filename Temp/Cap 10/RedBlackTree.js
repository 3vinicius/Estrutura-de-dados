/* eslint-disable */

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

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) == Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    }
    if (this.compareFn(key, node.key) == Compare.BIGGER_THAN) {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  posOrderTraverse(callback) {
    this.posOrderTraverseNode(this.root, callback);
  }

  posOrderTraverseNode(node, callback) {
    if (node != null) {
      this.posOrderTraverseNode(node.left, callback);
      this.posOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }

  max() {
    return this.maxNode(this.root);
  }

  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current.key;
  }

  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current.key;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node == null) {
      return false;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    return true;
  }

  /* /// My methodos for preOrder inorder using if and else
  This is my inOrderTraverse. Is not necessary if else using...

  inOrderTraverse(node = this.root){
    if(node.left == null){
      console.log(node.key)
    } else {
      this.inOrderTraverse(node.left);
      console.log(node.key)
    }
    if(node.right != null){
      this.inOrderTraverse(node.right);
    }
  }

  preOrderTraverse(node = this.root){
    if(node.left == null){
      console.log(node.key)
    } else {
      console.log(node.key)
      this.preOrderTraverse(node.left);
    }
    if(node.right != null){
      this.preOrderTraverse(node.right);
    }
  }

  // My methods min() and max()

  min(){
    let current = this.root;
    while (current.left != null) {
      current = current.left;
    }
    console.log(current.key);
  }

  max(){
    let current = this.root;
    while (current.right != null) {
      current = current.right;
    }
    console.log(current.key);
  }

  // My method search


  searchNode(node,key){

    let current = node;
    if(current != null){
      let value;
    if(current.key == key){
      return true;
    }
    value = this.searchNode(current.left,key)
    value = this.searchNode(current.right,key)
    return value;
  }
  }

  */

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node == null) {
      return undefined;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    if (node.left == null && node.right == null) {
      node = undefined;
      return node;
    }
    if (node.left == null) {
      node = node.right;
      return node;
    }
    if (node.right == null) {
      node = node.left;
      return node;
    }

    const aux = this.minNode(node.right);
    node.key = aux.key;
    node.right = this.removeNode(node.right, aux.key);
    return node;
  }
}

const BalanceFactor = {
  UNBALANCE_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCE_LEFT: 5,
};

const Colors = {
  BlACK: "BLACK",
  RED: "RED",
};
/* Rulues

  1- root is black
  2- black folhas
  3- if node is red, yours children has red
  4- Does not have two nodes reds adjacnetes
  5- path your children null has number igualite black nodes
*/

class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.key = key;
    this.color = Colors.RED;
    this.parent = null;
  }

  isRed() {
    return this.color === Colors.RED;
  }
}

class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super();
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BlACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertNode(node.right, key);
    }
  }

  fixTreeProperties(node) {
    while (
      node &&
      node.parent &&
      //node.parent.color.isRed()
      node.parent.isRed() &&
      node.color !== Colors.BlACK
    ) {
      let parent = node.parent;
      const grandParent = parent.parent;
      // case A: father is childres left
      if (grandParent && grandParent.left == parent) {
        const uncle = grandParent.right;

        // case 1A: uncle has color.RED - recolor
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BlACK;
          uncle.color = Colors.BlACK;
          node = grandParent;
        } else {
          // Case 2A: node is child left
          if(node === parent.right ){
            this.rotationRR(parent);
            node = parent
            parent = node.parente
          }
          // Case 3A: node is child right
          this.rotationLL(grandParent)
          parent.color = Colors.BlACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      } else {
        // Case B: father is child right
        const uncle = grandParent.left
        // Case 1B: uncle is red
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BlACK;
          uncle.color = Colors.BlACK;
          node = grandParent;
        } else {
          // Case 2B: node is child left
          if(parent.left === node){
            this.rotationLL(parent);
            node = parent
            parent = node.parent
          }
          // Case 3B: node is child right
          this.rotationRR(grandParent);
          parent.color = Colors.BlACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
    }
    this.root.color = Colors.BlACK;
  }

  rotationLL(node){
    const temp = node.left;
    node.left = temp.right;
    if (temp.right && temp.right.key){
      temp.right.parent = node
    }
    temp.parent = node.parent
    if(!node.parent){
      this.root = temp;
    }
    else {
      if(node === node.parent.left){
        node.parent.left = temp
      } else {
        node.parent.right = temp
      }
    }
    temp.right = node;
    node.parent = temp;
  }

  rotationRR(node){
    const temp = node.right;
    node.right = temp.left;
    if(temp.left && temp.left.key){
      temp.left.parent = node;
    }
    temp.parent = node.parent;
    if(!node.parent){
      this.root = temp
    } else {
      if(node === node.parent.left){
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }
    temp.left = node;
    node.parent = temp;
  }
}

function createRedBlack() {
  const tree = new RedBlackTree();
  tree.insert(11);
  tree.insert(7);
  tree.insert(5);
  tree.insert(3);
  tree.insert(6);
  tree.insert(9);
  tree.insert(8);
  tree.insert(10);
  tree.insert(15);
  tree.insert(13);
  tree.insert(12);
  tree.insert(14);
  tree.insert(20);
  tree.insert(18);
  tree.insert(25);

  return tree;
}

const tree = createRedBlack()

console.log(tree);



