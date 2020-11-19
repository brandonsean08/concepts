/* Binary Search Tree */

/**
 * Each data point in the Tree is called a Node.
 * 
 * Top Node of the tree is called the root.
 * 
 * Top Node is also called the parent node.
 * 
 * Children Nodes are nodes that link to the same parent. 
 * 
 * A subtree is a collection of nodes that don't connect to the root node.
 * 
 * Leaf Nodes are nodes at the end of the tree that have no children.
 * 
 * A Binary tree can only have a maximum of two branches per node. BST trees are also ORDERED.
 * Each subtree is less than or equal to the parent node and each right node is less than or 
 * equal to the parent node.
 */

/**
 * The Node class represents each data point in the BST. 
 */
class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  /**
   * The BST class represents the full BST.
   */
  class BST {
    //Initialize the root node to be null.
    constructor() {
      this.root = null;
    }
    //Call the add method to add data to the tree
    add(data) {
      //Create a reference to the node that we are dealing with and set it to the root
      const node = this.root;
      //If the Node is null (no tree), then we create a node and set it to the data (this is the root now).
      if (node === null) {
        this.root = new Node(data);
        return;
      } else {
        //If we already have a root node, then we are going to search the tree to see where to put our next node.
        const searchTree = function(node) {
          //If the data is less than the current node, we check if the left is null. If it is, we set the data
          //If not, then we search the tree again, down the left.
          if (data < node.data) {
            if (node.left === null) {
              node.left = new Node(data);
              return;
            } else if (node.left !== null) {
              return searchTree(node.left);
            }
          } else if (data > node.data) {
            //we perform the same logic as before but just for values greater than the node
            if (node.right === null) {
              node.right = new Node(data);
              return;
            } else if (node.right !== null) {
              return searchTree(node.right);
            }
          } else {
            return null;
          }
        };
        return searchTree(node);
      }
    }
    //The min value is always the leaf node on the left of the BST. So we can start at the root and
    //loop until we have no more nodes to the left, then we return the leaf nodes data. 
    findMin() {
      let current = this.root;
      while (current.left !== null) {
        current = current.left;
      }
      return current.data;
    }
    //The max value is always the leaf node on the right of the BST. So we can start at the root and
    //loop until we have no more nodes to the right, then we return the leaf nodes data. 
    findMax() {
      let current = this.root;
      while (current.right !== null) {
        current = current.right;
      }
      return current.data;
    }
    //Similar to finding the min and max but we change up the assignment based on bigger or smaller.
    find(data) {
      let current = this.root;
      while (current.data !== data) {
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        if (current === null) {
          return null;
        }
      }
      return current;
    }
    //Traverse the tree and return whther a data point is present or not
    isPresent(data) {
      let current = this.root;
      while (current) {
        if (data === current.data) {
          return true;
        }
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return false;
    }

    remove(data) {
      const removeNode = function(node, data) {
        //Check for empty tree, if empty then we return null.
        if (node == null) {
          return null;
        }
        //If we have reached the node we want to remove, then we need to check if it has children
        if (data == node.data) {
          //If the node has no children, then we set the node to null 
          if (node.left == null && node.right == null) {
            return null;
          }
          //If the node has no left children, then we set the node to the value of the right child
          if (node.left == null) {
            return node.right;
          }
          //If the node has no right children, then we set the node to the value of the left child
          if (node.right == null) {
            return node.left;
          }
          //If the node has two children, we need to check the node to the right of it, and keep
          //searching for its left most child.
          var tempNode = node.right;
          while (tempNode.left !== null) {
            tempNode = tempNode.left;
          }
          node.data = tempNode.data;
          node.right = removeNode(node.right, tempNode.data);
          return node;
        } else if (data < node.data) {
          node.left = removeNode(node.left, data);
          return node;
        } else {
          node.right = removeNode(node.right, data);
          return node;
        }
      }
      this.root = removeNode(this.root, data);
    }
    isBalanced() {
      return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }
    inOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traverseInOrder(node) {       
          node.left && traverseInOrder(node.left);
          result.push(node.data);
          node.right && traverseInOrder(node.right);
        }
        traverseInOrder(this.root);
        return result;
      };
    }
    preOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traversePreOrder(node) {
          result.push(node.data);
          node.left && traversePreOrder(node.left);
          node.right && traversePreOrder(node.right);
        };
        traversePreOrder(this.root);
        return result;
      };
    }
    postOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traversePostOrder(node) {
          node.left && traversePostOrder(node.left);
          node.right && traversePostOrder(node.right);
          result.push(node.data);
        };
        traversePostOrder(this.root);
        return result;
      }
    }
    
    levelOrder() {
        let result = [];
        let Q = []; 
        if (this.root != null) {
            Q.push(this.root);
            while(Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                };
                if (node.right != null) {
                    Q.push(node.right);
                };
            };
            return result;
        } else {
            return null;
        };
    };
  }
  
  
  
  const bst = new BST();
  
  bst.add(9);
  bst.add(4);
  bst.add(17);
  bst.add(3);
  bst.add(6);
  bst.add(22);
  bst.add(5);
  bst.add(7);
  bst.add(20);
  
  console.log(bst.findMinHeight());
  console.log(bst.findMaxHeight());
  console.log(bst.isBalanced());
  bst.add(10);
  console.log(bst.findMinHeight());
  console.log(bst.findMaxHeight());
  console.log(bst.isBalanced());
  console.log('inOrder: ' + bst.inOrder());
  console.log('preOrder: ' + bst.preOrder());
  console.log('postOrder: ' + bst.postOrder());
  
  console.log('levelOrder: ' + bst.levelOrder());