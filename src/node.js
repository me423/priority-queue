class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!node) return;
		if (this.left == null) {
		  this.left = node;
		}
		else if (this.right == null) {
		  this.right = node;
		}
		node.parent = this;
	}

	removeChild(node) {
		if (node == null) {
			return
		  }
	  
		  if (this.left == node) {
			this.left.parent = null;
			this.left = null;
		  } else if (this.right == node) {
			this.right.parent = null;
			this.right = null;
		  } else {
			throw 'incorrect child';
		}
	}

	remove() {

	}

	swapWithParent() {
		
	}
}

module.exports = Node;
