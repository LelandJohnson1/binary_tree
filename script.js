const arr = [3, 1, 13, 8, 5];
//sort array
let sortedArray = arr.sort(function (a, b) {
	return a - b;
});

//Node structure storage
const node = (parentNode) => {
	let base = parentNode;
	let left = null;
	let right = null;
	return { base, left, right };
};

//Create BST
const bstCreator = (arr, start, end) => {
	if (start > end) {
		return null;
	}

	let mid = parseInt((start + end) / 2);
	let newNode = node(arr[mid]);
	newNode.left = bstCreator(arr, start, mid - 1);
	newNode.right = bstCreator(arr, mid + 1, end);

	return newNode;
};

//Extra functions for finalized BST
const tree = (binaryTree, arr = sortedArray) => {
	let tree = binaryTree;
	let tempArr = arr;

	return {
		tree,

		insert: function (newBase, BST = binaryTree) {
			if (newBase < BST.base) {
				if (BST.left == undefined) {
					BST.left = { base: newBase, left: null, right: null };
					return;
				}

				this.insert(newBase, BST.left);
			} else if (newBase > BST.base) {
				if (BST.right == undefined) {
					BST.right = { base: newBase, left: null, right: null };
					return;
				}

				this.insert(newBase, BST.right);
			} else if (newBase == BST.base) {
				return BST;
			}
			if (BST == binaryTree) {
				console.log(BST);
				return BST;
			}
		},

		delete: function (value, BST = binaryTree, tempArr) {
			//what happens if value is firstnumber in tree?
			//find new middle term
			//traverse tree until you find this middle term
			//set the og base node to this middle term //just change the base number
			//set prev node that was before middle term to middle terms next term
			if (value == BST.base) {
				let newArr = arr.filter(getBase);
				function getBase(value) {
					return value > BST.base || value < BST.base;
				}
				let mid = parseInt((0 + (newArr.length - 1)) / 2);
				this.delete(newArr[mid], binaryTree);
				BST.base = newArr[mid];
				return BST;
			} else if (value < BST.base) {
				if (value == BST.left.base) {
					let nextNode = BST.left.left == null ? BST.left.right : BST.left.left;
					BST.left = nextNode;
					return BST;
				}
				this.delete(value, BST.left);
			} else if (value > BST.base) {
				if (value == BST.right.base) {
					let nextNode =
						BST.right.right == null ? BST.right.left : BST.right.right;
					BST.right = nextNode;
					return BST;
				}
				this.delete(value, BST.right);
			}
			if (BST == binaryTree) {
				return BST;
			}
		},

		find: function (value, BST = binaryTree) {
			if (value < BST.base) {
				return this.find(value, BST.left);
			} else if (value > BST.base) {
				return this.find(value, BST.right);
			} else if (value == BST.base) {
				return BST;
			}
			return;
		},

		levelOrder: function (
			BST = binaryTree,
			arr = [BST],
			queue = function queue(node) {
				//this just returns a node value
				return node;
			}
		) {
			if (arr.length == 0) {
				return;
			}
			if (BST.left != null) {
				arr.push(BST.left);
			}
			if (BST.right != null) {
				arr.push(BST.right);
			}
			//read out base and delete
			let temp = arr.shift();
			let temp2 = queue(temp.base);
			console.log(temp2);
			this.levelOrder(arr[0], arr);
			return;
		},

		inOrder: function (BST = binaryTree, origin = binaryTree.base) {
			if (BST.left != null) {
				this.inOrder(BST.left);
				console.log(BST.base);
			}
			if (BST.right != null) {
				this.inOrder(BST.right);
			}
			if (BST.base != origin) {
				console.log(BST.base);
				return;
			} else {
				return;
			}
		},

		preOrder: function (BST = binaryTree) {
			console.log(BST.base);
			if (BST.left != null) {
				this.preOrder(BST.left);
			}
			if (BST.right != null) {
				this.preOrder(BST.right);
			}
			return;
		},

		postOrder: function (BST = binaryTree) {
			if (BST.left != null) {
				this.postOrder(BST.left);
			}
			if (BST.right != null) {
				this.postOrder(BST.right);
				console.log(BST.base);
				return;
			}

			console.log(BST.base);
			return;
		},

		height: function (num, BST = binaryTree, heightnum = 0, pass = false) {
			if (BST.base == num) {
				pass = true;
			}
			if (BST.left != null) {
				if (pass == true) {
					this.height(num, BST.left, heightnum++);
				} else {
					this.height(num, BST.left);
				}
			}
			if (BST.right != null) {
				if (pass == true) {
					this.height(num, BST.right, heightnum++);
				} else {
					this.height(num, BST.right);
				}
			}
			if (pass == true) {
				pass = false;
				console.log(heightnum);
				return;
			} else {
				return;
			}
		},

		depth: function (num, BST = binaryTree, heightnum = 0, pass = true) {
			if (BST.base == num) {
				pass = false;
			}
			if (BST.left != null) {
				if (pass == false) {
					this.depth(num, BST.left);
				} else {
					this.depth(num, BST.left, (heightnum += 1));
					heightnum = 0;
				}
			}
			if (BST.right != null) {
				if (pass == false) {
					this.depth(num, BST.right);
				} else {
					this.depth(num, BST.right, (heightnum += 1));
					heightnum = 0;
				}
			}
			if (pass == false) {
				console.log(heightnum);
				return;
			} else {
				return;
			}
		},

		isBalanced: function (
			BST = binaryTree,
			num = 0,
			origin = binaryTree.base,
			leftHeight,
			rightHeight
		) {
			if (BST.left != null) {
				leftHeight = this.isBalanced(BST.left, (num += 1));
				if (BST.base == origin) {
					num = 0;
				}
			}
			if (BST.right != null) {
				rightHeight = this.isBalanced(BST.right, (num += 1));
				if (BST.base == origin) {
					num = 0;
				}
			}
			if (BST.base != origin) {
				return num;
			} else {
				if (leftHeight - rightHeight > 1) {
					console.log("Not balanced");
					return "Not balanced";
				} else {
					console.log("Balanced");
					return "Balanced";
				}
			}
		},

		balanced: function (BST = binaryTree) {
			let temp = this.isBalanced();
			if (temp == "Balanced") {
				console.log("Nothing to rebalance");
			} else {
			}

			if (BST.left != null) {
				this.postOrder(BST.left);
			}
			if (BST.right != null) {
				this.postOrder(BST.right);
				console.log(BST.base);
				return;
			}

			console.log(BST.base);
			return;
		},
	};
};

let finalNode = bstCreator(sortedArray, 0, sortedArray.length - 1);
//console.log(finalNode);
//tree(finalNode).balance();
