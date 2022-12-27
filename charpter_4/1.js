class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
    // return this
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  shift() {
    return this.items.shift();
  }

  unshift(val) {
    this.items.unshift(val);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

const stack = new Stack();
// console.log(stack, stack.isEmpty());
stack.push(1);
stack.push(2);
stack.push(3);
// console.log(stack, stack.isEmpty());
// console.log('peek', stack.peek());

function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = '';
  while (number > 0) {
    // {1}
    rem = Math.floor(number % 2); // {2}
    remStack.push(rem); // {3}
    number = Math.floor(number / 2); // {4}
  }
  while (!remStack.isEmpty()) {
    // {5}
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

// console.log(process.argv);
// console.log(decimalToBinary(process.argv[2] || 5));
module.exports = {
  Stack
};
