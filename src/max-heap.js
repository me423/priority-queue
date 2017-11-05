const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize ++;
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
		
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
		} else {
			this.parentNodes[0].appendChild(node);
		}
		this.parentNodes.push(node);
		if (this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
		} else if (node.parent && node.parent.priority < node.priority) {
			let parent = node.parent;
			let indexOfNode = this.parentNodes.indexOf(node);
			let indexOfParentNode = this.parentNodes.indexOf(parent);
			if (indexOfNode >= 0) {
			  this.parentNodes[indexOfNode] = parent;
			}
			if (indexOfParentNode >= 0) {
			  this.parentNodes[indexOfParentNode] = node;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node.left && node.right) {
			if (node.priority > node.left.priority && node.priority > node.right.priority) {
			  return;
			}
			if (node.left.priority > node.right.priority) {
			  this.shiftNodeUp(node.left);
			  this.shiftNodeDown(node);
			} else if (node.left.priority < node.right.priority) {
			  this.shiftNodeUp(node.right);
			  this.shiftNodeDown(node);
			}
		} else if (node.left && !node.right) {
			if (node.priority > node.left.priority) {
			  return;
			} else {
			  this.shiftNodeUp(node.left);
			  this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
