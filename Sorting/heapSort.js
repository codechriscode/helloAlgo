import {Heap} from "../Heaps/heap.js";

class HeapSort {
  #heap

  constructor(arrayToSort) {
    this.#heap = new Heap(true, arrayToSort)
  }

  sorted() {
    const result = []
    const len = this.#heap.size();
    for(let i = 0; i < len; i++) {
      result.push(this.#heap.pop())
    }
    return result;
  }
}

function runHeapSort() {
  const unorderedRandomArray = [23456,76,78,678,8,26,315,12,4,465,247,568,6,8956457,5342,634,513,453,46542,75,85,78];
  const randomHeapSort = new HeapSort(unorderedRandomArray);
  console.log(randomHeapSort.sorted())

  const worstCaseSimple = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]
  const simpleHeapSort = new HeapSort(worstCaseSimple);
  console.log(simpleHeapSort.sorted())
}

runHeapSort()
