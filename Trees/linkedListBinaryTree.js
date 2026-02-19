export class BT {
  value;
  left;
  right;

  constructor(value = null, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.value = value
  }

  traverseLevelOrder() {
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

function runLlBTs() {
  console.log("********** LINKED-LIST-BASED BTREE **********", '\n')

  const rootBt = new BT(0, new BT(1, new BT(3), new BT(4)), new BT(2, new BT(5), new BT(6)))
  console.log("Breadth-first search")
  console.log(rootBt.traverseLevelOrder())
  console.log("Depth-first search, PreOrder")
  console.log(rootBt.traversePreOrder())
  console.log("Depth-first search, InOrder")
  console.log(rootBt.traverseInOrder())
  console.log("Depth-first search, PostOrder")
  console.log(rootBt.traversePostOrder())
}
