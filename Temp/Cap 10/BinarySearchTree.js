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

  inOrderTraverse(callback){
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback){
    if(node != null){
      this.inOrderTraverseNode(node.left,callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right,callback);
    }
  }

  preOrderTraverse(callback){
    this.preOrderTraverseNode(this.root,callback)
  }

  preOrderTraverseNode(node,callback){
    if(node != null){
      callback(node.key)
      this.preOrderTraverseNode(node.left,callback)
      this.preOrderTraverseNode(node.right,callback)
    }
  }

  posOrderTraverse(callback){
    this.posOrderTraverseNode(this.root,callback)
  }

  posOrderTraverseNode(node, callback){
    if(node != null){
      this.posOrderTraverseNode(node.left,callback);
      this.posOrderTraverseNode(node.right,callback);
      callback(node.key);
    }
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
  }  */


}



function createTree() {
  const tree = new BinarySearchTree();
  tree.insert(11)
  tree.insert(7)
  tree.insert(5)
  tree.insert(3)
  tree.insert(6)
  tree.insert(9)
  tree.insert(8)
  tree.insert(10)
  tree.insert(15)
  tree.insert(13)
  tree.insert(12)
  tree.insert(14)
  tree.insert(20)
  tree.insert(18)
  tree.insert(25)

  return tree;
}
const tree = createTree()

//my callback for functions inOrder and inOrder
const callback = (value) => console.log(value)
tree.posOrderTraverse(callback);



//preOrdem
