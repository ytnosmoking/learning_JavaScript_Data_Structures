// 树

// 二叉树  节点最多只能有两个子节点 一个左侧子节点 一个右侧子节点
// !二叉搜索树 只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值

// const { defaultCompare, Compare } = require('../utils')

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
};

function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  // 中序 遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  // 先序 遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  // 后续 遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }

  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node == null) {
      return false;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node == null) {
      return null;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 要删除的节点 小于节点值  向左递归
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 要删除的节点 大于节点值  向右递归
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // key === node.key
      // 节点不存在
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      if (node.left == null) {
        // 节点左边不存在
        node = node.right;
        return node;
      } else if (node.right == null) {
        // 节点右边不存在
        node = node.left;
        return node;
      }
      // 节点左右两边都有 但是要删除当前节点值 从最右找最小值取代当前 并且删除最右最小值
      const aux = this.minNode(node.right); // {18}
      node.key = aux.key; // {19}
      node.right = this.removeNode(node.right, aux.key); // {20}
      return node; // {21}
    }
  }
}

const tree = new BinarySearchTree();
tree.insert(11);
// console.log(tree)
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
// console.log(tree)

// function getLeftAndRight(tree, info = { left: [], right: [], all: [] }) {
//   const node = tree.root || tree

//   if (node.left) {
//     getLeftAndRight(node.left, info)
//     info.left.push(node.left)
//   }
//   info.all.push(node)
//   if (node.right) {
//     info.right.push(node.right)
//     getLeftAndRight(node.right, info)
//   }
// }

// const allLefts = { left: [], right: [], all: [] }

// getLeftAndRight(tree, allLefts)
// console.log(allLefts)

console.log(tree.min());
console.log(tree.max());
console.log(tree.search(1));
console.log(tree.search(3));
tree.remove(7);
console.log(tree);

const startArr = [];
const middleArr = [];
const endArr = [];
// const printNode = value => console.log(value) // {6}
// tree.inOrderTraverse(printNode)

const pushStart = value => startArr.push(value);
const pushMiddle = value => middleArr.push(value);
const pushEnd = value => endArr.push(value);
tree.preOrderTraverse(pushStart);
tree.inOrderTraverse(pushMiddle);
tree.postOrderTraverse(pushEnd);
console.log(startArr);
console.log(middleArr);
console.log(endArr);

//  平衡树 AVL（Adelson-Velskii-Landi） 添加或移除节点时，AVL树会尝试保持自平衡
const BalanceFactor = {
  UNBALANCED_RIGHT: 1, // 右侧不平衡
  SLIGHTLY_UNBALANCED_RIGHT: 2, // 右侧略微不平衡
  BALANCED: 3, // 平衡
  SLIGHTLY_UNBALANCED_LEFT: 4, // 左侧略微不平衡
  UNBALANCED_LEFT: 5 // 左侧不平衡
};
class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  // root: {
  //   key: 1,
  //   left: {
  //     key: 2,
  //     left: {
  //       key: 3,
  //       left: 4
  //     }
  //   },
  //   right:{
  //     key: 9,
  //     left:{
  //       key: 10,
  //       right:20
  //     },
  //     right:{
  //       key:11,
  //       left:{
  //         key: 12,
  //         left: {
  //           key: 13
  //         }
  //       }
  //     }
  //   }
  // }
  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);

    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  // LL 向右的单旋转 左侧子节点的高度大于右侧子节点的高度
  // RR 向左的单旋转 右侧子节点的高度大于左侧子节点的高度
  // LR 向右的双旋转 （先LL 再RR）
  // RL 向左的双旋转 （先RR 再LL）

  // LL 向右的单旋转
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  // RR 向左的单旋转
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  // LR 向右的双旋转
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  // RL 向左的双旋转
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }
    const balanceFactor = this.getBalanceFactor(node); // 节点是否平衡
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  removeNode(node, key) {
    node = super.removeNode(node, key);
    if (node == null) {
      return node;
    }
    // 检测数 是否平衡
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }
}

const bNode1 = new AVLTree();
bNode1.insert(1);
bNode1.insert(7);
bNode1.insert(2);
// bNode1.insert(9)
// bNode1.insert(10)
// bNode1.insert(11)
console.log(bNode1);
const bNodes = bNode1.root;
console.log(
  'left',
  bNodes.left?.key,
  bNodes.left?.left?.key,
  bNodes.left?.left?.left?.key,
  bNodes.left?.left?.left?.left?.key
);
console.log(
  'right',
  bNodes.right?.key,
  bNodes.right?.right?.key,
  bNodes.right?.right?.right?.key,
  bNodes.right?.right?.right?.right?.key
);
