# Heaps
Heaps are complete binary trees.
- min heap: The value of any node the values of its child nodes.
- max heap: The value of any node the values of its child nodes.

And so
- The bottom layer nodes are filled from left to right, and nodes in other layers are fully filled.
- We call the root node of the binary tree the "heap top" and the bottom-rightmost node the "heap bottom."
- For max heaps (min heaps), the value of the heap top element (root node) is the largest (smallest).

We use heapify to maintain trees following the above characteristics as we add and remove elements.
