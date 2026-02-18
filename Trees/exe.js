class BT {
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
    while (queue.length) {
      const node = queue.shift()
      if (node.value != null) list.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    return list;
  }

  #dfs(order, root = this, list = []) {
    if (root == null) return

    if (order === 'pre') list.push(root.value)
    this.#dfs(order, root.left, list);
    if (order === 'in') list.push(root.value)
    this.#dfs(order, root.right, list)
    if (order === 'post') list.push(root.value)

    return list;
  }

  traversePreOrder() {
    return this.#dfs('pre')
  }

  traverseInOrder(root = this, list = []) {
    return this.#dfs('in')
  }

  traversePostOrder(root = this, list = []) {
    return this.#dfs('post')
  }
}

console.log("********** LINKED-LIST-BASED BTREE **********", '\n')

const rootBt = new BT(0, new BT(1, new BT(3), new BT(4)), new BT(2, new BT(5), new BT(6)))
console.log("Breadth-first search")
console.log(rootBt.bfsLevelOrder())
console.log("Depth-first search, PreOrder")
console.log(rootBt.traversePreOrder())
console.log("Depth-first search, InOrder")
console.log(rootBt.traverseInOrder())
console.log("Depth-first search, PostOrder")
console.log(rootBt.traversePostOrder())

class ArrayBT {
  // Optimal when tree is Complete
  // Stored in level-order traversal
  #tree;

  constructor(array = []) {
    this.#tree = array;
  }

  size() {
    return this.#tree.length;
  }

  traverseLevelOrder() {
    return [...this.#tree];
  }

  #dfs(order, nodeIndex = 0, list = []) {
    if (nodeIndex >= this.size()) return;

    if (order === 'pre') list.push(this.#tree[nodeIndex])
    this.#dfs(order, this.leftIndexFrom(nodeIndex), list);
    if (order === 'in') list.push(this.#tree[nodeIndex])
    this.#dfs(order, this.rightIndexFrom(nodeIndex), list)
    if (order === 'post') list.push(this.#tree[nodeIndex])

    return list;
  }

  traversePreOrder() {
    return this.#dfs('pre')
  }

  traverseInOrder() {
    return this.#dfs('in')
  }

  traversePostOrder() {
    return this.#dfs('post')
  }

  valueAt(index) {
    return this.#tree[index]
  }

  valueOfLeft(index) {
    return this.#tree[this.leftIndexFrom(index)]
  }

  valueOfRight(index) {
    return this.#tree[this.rightIndexFrom(index)]
  }

  valueOfParent(index) {
    return this.#tree[this.parentIndexFrom(index)]
  }

  leftIndexFrom(index) {
    return 2 * index + 1
  }

  rightIndexFrom(index) {
    return 2 * index + 2
  }

  parentIndexFrom(index) {
    return Math.floor((index - 1) / 2)
  }

  setAtIndex(index, value) {
    try {
      this.#tree[index] = value;
      return true;
    } catch {
      return false;
    }
  }
}

console.log('\n', "********** ARRAY-BASED BTREE **********", '\n')

const rootABt = new ArrayBT([
  0, 1, 2, 3, 4, 5, 6
])
console.log("Breadth-first search")
console.log(rootABt.traverseLevelOrder())
console.log("Depth-first search, PreOrder")
console.log(rootABt.traversePreOrder())
console.log("Depth-first search, InOrder")
console.log(rootABt.traverseInOrder())
console.log("Depth-first search, PostOrder")
console.log(rootABt.traversePostOrder())
