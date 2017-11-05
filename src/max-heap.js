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
		if (this.isEmpty()) {
			return;
		}
		this.heapSize --;
		let detached = this.detachRoot();
		if (this.isEmpty()) {
			return detached.data;
		}
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		return detached.data;
	}

	detachRoot() {
		let root = this.root;
		let rootIndex = this.parentNodes.indexOf(root);
		if (rootIndex >= 0) {
		  this.parentNodes.splice(rootIndex, 1);
		}
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (typeof detached.data === 'undefined') {
			return;
		}
		let lastEl = this.parentNodes.pop();
		let lastElParent = lastEl.parent;
	  
		if (lastElParent.left == lastEl) {
			lastElParent.left = null;
		} else {
			lastElParent.right = null;
		}
		this.root = lastEl;
		this.root.parent = null;
	  
		if (detached.left != lastEl) {
			lastEl.left = detached.left;
			if (lastEl.left) {
			  lastEl.left.parent = lastEl;
			}
		}
		if (detached.right != lastEl) {
			lastEl.right = detached.right;
			if (lastEl.right) {
			  lastEl.right.parent = lastEl;
			}
		}
	  
		if (lastElParent != detached) {
			this.parentNodes.unshift(lastElParent);
		}
		this.parentNodes.unshift(lastEl);
	  
		 if (this.root.left && this.root.right) {
			this.parentNodes.shift();
		}
	}

	size() {
		if (this.isEmpty()) {
			return 0;
		} else {
			return this.heapSize;
		}
	}

	isEmpty() {
		return this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
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
