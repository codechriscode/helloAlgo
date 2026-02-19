import {ArrayBT} from "../Trees/arrayBinaryTree.js";

export class Heap extends ArrayBT {
  #min
  #max

  constructor(min, array = []) {
    super(array)
    this.#min = min
    this.#max = !min

    this.#constructHeapFromOriginalTree()
  }

  // Ends up being ~O(n) since subtrees get
  // progressively more ordered; leaf node populace
  // get no attention; and each iteration
  // runs at most H heapifyT-B recursions
  #constructHeapFromOriginalTree() {
    const heapLen = this.tree.length
    for(let i = heapLen - 1; i >= 0; i--) {
      this.#heapifyTopBottom(i)
    }
  }

  peek() {
    return this.tree[0]
  }

  push(element) {
    // add to the bottom
    const newLength = this.tree.push(element)
    // heapify from the element's position
    this.#heapifyBottomTop(newLength - 1)
  }

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

  pop() {
    const poppingTopValue = this.peek();
    this.tree[0] = this.tree[this.size() - 1];
    this.tree.pop();

    this.#heapifyTopBottom(0)

    return poppingTopValue;
  }

  #heapifyTopBottom(startingPosition) {
    const leftIndex = this.leftIndexFrom(startingPosition)
    const rightIndex = this.rightIndexFrom(startingPosition)
    let nextPosition;

    const leftValue = this.tree[leftIndex]
    const rightValue = this.tree[rightIndex]
    const positionValue = this.tree[startingPosition]

    const evalSwap = (direction) => {
      let minCondition;
      let maxCondition;
      if(direction === 'left') {
        if(leftIndex >= this.size()) return false
        minCondition = this.#min && leftValue < positionValue;
        maxCondition = this.#max && leftValue > positionValue;
      } else if(direction === 'right') {
        if(rightIndex >= this.size()) return false
        minCondition = this.#min && rightValue < positionValue;
        maxCondition = this.#max && rightValue > positionValue;
      } else {
        throw new Error("Invalid evalSwap direction")
      }
      return minCondition || maxCondition;
    }

    if(evalSwap('left')) {
      this.tree[startingPosition] = leftValue;
      this.tree[leftIndex] = positionValue;
      nextPosition = leftIndex;
    } else if(evalSwap('right')) {
      this.tree[startingPosition] = rightValue;
      this.tree[rightIndex] = positionValue;
      nextPosition = rightIndex
    } else {
      return;
    }

    this.#heapifyTopBottom(nextPosition)
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
}

runHeaps()
