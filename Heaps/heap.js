import {ArrayBT} from "../Trees/arrayBinaryTree.js";

export class Heap extends ArrayBT {
  #min
  #max

  constructor(min, array = []) {
    if(typeof min !== 'boolean') throw "Invalid min/max type"

    super(array)
    this.#min = min
    this.#max = !min

    this.#constructHeapFromOriginalTreeRecursive()
    // this.#constructHeapFromOriginalTree()
  }

  #constructHeapFromOriginalTree() {
    const heapLen = this.tree.length
    for(let i = this.parentIndexFrom(heapLen-1); i >= 0; i--) {
      this.#heapifyTopBottom(i)
    }
  }

  // Ends up being ~O(n) since subtrees get
  // progressively more ordered; leaf node populace
  // are ultimately ignored; and each iteration
  // runs at most H heapifyT-B recursions

  #heapifyBottomTop(startingPosition = this.tree.length - 1) {
    const parentIndex = this.parentIndexFrom(startingPosition)
    const parentValue = this.tree[parentIndex]
    const positionValue = this.tree[startingPosition]

    const evalSwap = () => {
      const minCondition = this.#min && parentValue > positionValue
      const maxCondition = this.#max && parentValue < positionValue
      return minCondition || maxCondition
    }

    if(evalSwap()) {
      this.tree[parentIndex] = positionValue
      this.tree[startingPosition] = parentValue
    } else {
      return;
    }

    this.#heapifyBottomTop(parentIndex)
  }

  #heapifyTopBottom(startingPosition = 0) {
    while(true) {
      const leftIndex = this.leftIndexFrom(startingPosition);
      const rightIndex = this.rightIndexFrom(startingPosition)

      const leftValue = this.tree[leftIndex]
      const rightValue = this.tree[rightIndex]
      let positionToChange = startingPosition;

      // #min and #max kept mutually exclusive, safe to use || later
      const leftMinCondition = this.#min && leftValue < this.tree[positionToChange] && leftIndex < this.size()
      const leftMaxCondition = this.#max && leftValue > this.tree[positionToChange] && leftIndex < this.size()
      if(leftMinCondition || leftMaxCondition) positionToChange = leftIndex
      const rightMinCondition = this.#min && rightValue < this.tree[positionToChange] && rightIndex < this.size()
      const rightMaxCondition = this.#max && rightValue > this.tree[positionToChange] && rightIndex < this.size()
      if (rightMinCondition || rightMaxCondition) positionToChange = rightIndex

      if (startingPosition === positionToChange) break;

      // Swap
      const buffer = this.tree[positionToChange]
      this.tree[positionToChange] = this.tree[startingPosition]
      this.tree[startingPosition] = buffer

      startingPosition = positionToChange
    }
  }

  #constructHeapFromOriginalTreeRecursive() {
    const heapLen = this.tree.length
    for(let i = this.parentIndexFrom(heapLen-1); i >= 0; i--) {
      this.#heapifyTopBottomRecursive(i)
    }
  }
  #heapifyTopBottomRecursive(startingPosition) {
    const leftIndex = this.leftIndexFrom(startingPosition)
    const rightIndex = this.rightIndexFrom(startingPosition)

    const leftValue = this.tree[leftIndex]
    const rightValue = this.tree[rightIndex]
    let positionToChange = startingPosition

    const minLeftCondition = this.#min && leftValue < this.tree[positionToChange];
    const maxLeftCondition = this.#max && leftValue > this.tree[positionToChange];
    if(minLeftCondition || maxLeftCondition) positionToChange = leftIndex

    const minRightCondition = this.#min && rightValue < this.tree[positionToChange];
    const maxRightCondition = this.#max && rightValue > this.tree[positionToChange];
    if(minRightCondition || maxRightCondition) positionToChange = rightIndex

    if(positionToChange !== startingPosition) {
      const buffer = this.tree[positionToChange]
      this.tree[positionToChange] = this.tree[startingPosition]
      this.tree[startingPosition] = buffer
    } else {
      return;
    }

    this.#heapifyTopBottomRecursive(positionToChange)
  }

  peek() {
    return this.tree[0]
  }

  pop() {
    const poppingTopValue = this.peek();
    this.tree[0] = this.tree[this.size() - 1];
    this.tree.pop();

    this.#heapifyTopBottomRecursive(0)

    return poppingTopValue;
  }

  push(element) {
    // add to the bottom
    const newLength = this.tree.push(element)
    // heapify from the element's position
    this.#heapifyBottomTop(newLength - 1)
  }
}

function runHeaps() {
  console.log('\n', "********** MIN HEAP **********", '\n')

  const minHeap = new Heap(true, [0, 1, 2, 3, 4, 5, 6])
  minHeap.push(0)
  console.log(minHeap.traverseLevelOrder())
  minHeap.push(8)
  minHeap.push(2)
  console.log(minHeap.traverseLevelOrder())
  console.log(`Popping ${minHeap.pop()}`);
  console.log(minHeap.traverseLevelOrder())

  console.log('\n', "********** MAX HEAP **********", '\n')

  const maxHeap = new Heap(false, [6, 5, 4, 3, 2, 1, 0])
  maxHeap.push(0)
  console.log(maxHeap.traverseLevelOrder())
  maxHeap.push(8)
  maxHeap.push(2)
  console.log(maxHeap.traverseLevelOrder())
  console.log(`Popping ${maxHeap.pop()}`);
  console.log(maxHeap.traverseLevelOrder())

  console.log('\n', "********** MIN HEAP CONSTRUCTION **********", '\n')

  const minConstruction = new Heap(true, [8,7,6,5,4,3,2,1,0])
  console.log(minConstruction.traverseLevelOrder())

  console.log('\n', "********** MAX HEAP CONSTRUCTION **********", '\n')

  const maxConstruction = new Heap(false, [8,7,6,5,4,3,2,1,0].reverse())
  console.log(maxConstruction.traverseLevelOrder())
}

runHeaps()
