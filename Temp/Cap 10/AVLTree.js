/* eslint-disable */

const Compare = {
  EQUALS: 0,
  LESS_THAN: -1,
  BIGGER_THAN: 1
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
}

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  getNodeHeight(node){
    if(node == null){
      return -1
    }

    return Math.max(this.getNodeHeight(node.right),this.getNodeHeight(node.left))+1;
  }

  getBalanceFactor(node){
    const HightDifffer = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (HightDifffer) {
      case -2:
        return BalanceFactor.UNBALANCE_RIGHT

      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;

      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;

      case 2:
        return BalanceFactor.UNBALANCE_LEFT

      default:
        return BalanceFactor.BALANCED;
    }
  }

  rotationLL(node){
    const current = node.left;
    node.left = current.right;
    current.right = node;
    return current;
  }

  rotationRR(node){
    const current = node.right;
    node.right = current.left;
    current.left = node;
    return node;
  }
}





function createAVL() {
  const AVL = new AVLTree();
  AVL.insert(11);
  AVL.insert(7);
  AVL.insert(5);
  AVL.insert(3);
  AVL.insert(6);
  AVL.insert(9);
  AVL.insert(8);
  AVL.insert(10);
  AVL.insert(15);
  AVL.insert(13);
  AVL.insert(12);
  AVL.insert(14);
  AVL.insert(20);
  AVL.insert(18);
  AVL.insert(25);
  return AVL;
}

const AVL = createAVL();

console.log(AVL.getBalanceFactor(AVL.root));
