class BST {
  value;
  left;
  right;

  constructor(value = null, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.value = value
  }

  bfsLevelOrder() {
    const queue = [this]
    const list = []
    while(queue.length) {
      const node = queue.shift()
      if(node.value != null) list.push(node.value)
      if(node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
    }
    return list;
  }

  dfsPreOrder(root = this, list = []) {
    if(root == null) return
    list.push(root.value)
    this.dfsPreOrder(root.left, list);
    this.dfsPreOrder(root.right, list)
    return list;
  }

  dfsInOrder(root = this, list = []) {
    if(root == null) return
    this.dfsInOrder(root.left, list)
    list.push(root.value)
    this.dfsInOrder(root.right, list)
    return list;
  }

  dfsPostOrder(root = this, list = []) {
    if(root == null) return
    this.dfsPostOrder(root.left, list)
    this.dfsPostOrder(root.right, list)
    list.push(root.value)
    return list;
  }
}

const rootBst = new BST(0, new BST(1, new BST(3), new BST(4)), new BST(2, new BST(5), new BST(6)))
console.log("Breadth-first search")
console.log(rootBst.bfsLevelOrder())
console.log("Depth-first search, PreOrder")
console.log(rootBst.dfsPreOrder())
console.log("Depth-first search, InOrder")
console.log(rootBst.dfsInOrder())
console.log("Depth-first search, PostOrder")
console.log(rootBst.dfsPostOrder())

class ArrayBST {
  #tree;

  constructor() {
    this.#tree = [];
  }

  getAtIndex(index) {
    return this.#tree[index]
  }

  getLeftFrom(index) {
    return this.#tree[2*index + 1]
  }

  getRightFrom(index) {
    return this.#tree[2*index + 2]
  }


  setAtIndex(index, value) {
    try {
      this.#tree[index] = value;
      // return true
    } catch {
      return false;
    }
  }
}

