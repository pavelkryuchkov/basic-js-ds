const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class TreeNode {
  constructor(x) {
    this.data = x;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode === null) {
      this.rootNode = new TreeNode(data);
      return;
    }
    let prevNode = null;
    let curNode = this.rootNode;
    while (curNode) {
      if (data < curNode.data) {
        prevNode = curNode;
        curNode = curNode.left;
      } else if (data > curNode.data) {
        prevNode = curNode;
        curNode = curNode.right;
      } else {
        return;
      }
    }
    let newNode = new TreeNode(data);
    if (data < prevNode.data) {
      prevNode.left = newNode;
    } else {
      prevNode.right = newNode;
    }
    newNode.parent = prevNode;
  }

  has(data) {
    if (this.rootNode === null) {
      return false;
    }
    let curNode = this.rootNode;
    while (curNode) {
      if (curNode.data === data) {
        return true;
      } else if (data < curNode.data) {
        curNode = curNode.left;
      } else if (data > curNode.data) {
        curNode = curNode.right;
      }
    }
    return false;
  }

  find(data) {
    if (this.rootNode === null) {
      return null;
    }
    let curNode = this.rootNode;
    while (curNode) {
      if (curNode.data === data) {
        return curNode;
      } else if (data < curNode.data) {
        curNode = curNode.left;
      } else if (data > curNode.data) {
        curNode = curNode.right;
      }
    }
    return null;
  }

  remove(data) {
    let node = this.find(data);
    // console.log(node);
    if (!node) return;
    // if (node.parent === this.rootNode.data) this.rootNode = null;
    if (node.left === null && node.right === null) {
      if (node.parent) {
        if (data < node.parent.data) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
      } else {
        this.rootNode = null;
      }
    } else if (node.left === null) {
      if (node.parent) {
        if (data < node.parent.data) {
          node.parent.left = node.right;
        } else {
          node.parent.right = node.right;
        }
        node.right.parent = node.parent;
      } else {
        node.parent = null;
        this.rootNode = node;
      }
    } else if (node.right === null) {
      if (node.parent) {
        if (data < node.parent.data) {
          node.parent.left = node.left;
        } else if (node.parent) {
          node.parent.right = node.left;
        }
        node.left.parent = node.parent;
      } else {
        node.parent = null;
        this.rootNode = node;
      }
    } else {
      let curNode = node.right;
      while (curNode.left) {
        curNode = curNode.left;
      }
      // console.log(curNode);
      this.remove(curNode.data);
      if (node.parent) {
        if (data < node.parent.data) {
          node.parent.left = curNode;
        } else {
          node.parent.right = curNode;
        }
      } else {
        this.rootNode = curNode;
      }
      curNode.parent = node.parent;
      curNode.left = node.left;
      curNode.right = node.right;
      node.left.parent = curNode;
      if (node.right) {
        node.right.parent = curNode;
      }
    }
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }
    let curNode = this.rootNode;
    while (curNode.left) {
      curNode = curNode.left;
    }
    return curNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }
    let curNode = this.rootNode;
    while (curNode.right) {
      curNode = curNode.right;
    }
    return curNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
