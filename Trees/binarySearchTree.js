import {ArrayBT} from "./arrayBinaryTree.js";

class BinarySearchTree extends ArrayBT {
  constructor(array) {
    super(array);

    // this.#ensureSearchTree();
  }

  searchNode(value, startingPosition = 0) {
    const currentValue = this.tree[startingPosition]
    if(currentValue === value) return startingPosition;

    const l = this.leftIndexFrom(startingPosition);
    if(value < currentValue) return this.searchNode(value, l)

    const r = this.rightIndexFrom(startingPosition);
    if(value > currentValue) return this.searchNode(value, r)
  }

  traverse() {
    return this.traverseInOrder()
  }

}

function runBinarySearchTree() {
  console.log("******* BINARY SEARCH TREE *******", '\n')

  const bst = new BinarySearchTree([8,4,12,2,6,10,14,1,3,5,7,9,11,13,15])
  console.log("Inorder traversal = ordered elements")
  console.log(bst.traverse())
  console.log(`Found 15 at position ${bst.searchNode(15)}`)
  console.log(`Found 5 at position ${bst.searchNode(5)}`)


}

runBinarySearchTree()
