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
		if (!this.parent) {
			return;
		  }
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}
	  
		let parent = this.parent;
		let parentsParent = parent.parent;
		let parentsLeft = parent.left;
		let parentsRight = parent.right;
		let left = this.left;
		let right = this.right;
	  
		if (parentsParent) {
			parentsParent.removeChild(parent);
		}
	  
		parent.removeChild(parentsLeft);
		parent.removeChild(parentsRight);
		this.removeChild(left);
		this.removeChild(right);
	  
		if (parentsParent) {
			parentsParent.appendChild(this);
		}
	  
		if (parentsLeft == this) {
			this.appendChild(parent);
		} else {
			this.appendChild(parentsLeft);
		}
	  
		if (parentsRight == this) {
			this.appendChild(parent);
		} else {
			this.appendChild(parentsRight);
		}
	  
		parent.appendChild(left);
		parent.appendChild(right);
			  
		
	}
}

module.exports = Node;
