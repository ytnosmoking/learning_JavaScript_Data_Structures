// 递归

// 5 的阶乘 5*4*3*2*1

function plusNum(num) {
  if (num === 1) {
    return num;
  }
  // eslint-disable-next-line no-caller
  return num * arguments.callee(num - 1);
}

console.log(plusNum(5));
// 迭代阶乘

function factorialIterative(number) {
  if (number < 0) return undefined;
  let total = 1;
  for (let n = number; n > 1; n--) {
    total = total * n;
  }
  return total;
}
console.log(factorialIterative(5));

function factorial(n) {
  // console.trace()
  if (n === 1 || n === 0) {
    // 基线条件
    return 1;
  }
  return n * factorial(n - 1); // 递归调用
}

console.log(factorial(5)); // 120

function factorialTail(n, total) {
  if (n === 1 || n === 0) {
    return total;
  }
  return factorialTail(n - 1, n * total);
}
console.log(factorialTail(5, 1)); // 120

// 斐波那契  迭代
function fibonacciIterative(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  let fib2 = 0;
  let fib1 = 1;
  let fibN = n;
  for (let i = 2; i < n; i++) {
    fibN = fib1 + fib2;
    console.log(`fib1==${fib1}, fib2==${fib2} , i==${i}, fibN=${fibN}`);
    fib2 = fib1;
    fib1 = fibN;
  }
  return fibN;
}
console.log(fibonacciIterative(10)); // 由 0、1、1、2、3、5、8、13

function fibonacci(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(9));

// function fibonacciMemoization(n) {
//   const memo = [0, 1]
//   const fibonacci = (n, memo = memo) => {
//     if (memo[n] !== null) return memo[n]
//     return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo))
//   }
//   return fibonacci
// }

function fibonacciMemoization(n) {
  const memo = [0, 1]; // {1}
  const fibonacci = n => {
    if (memo[n] != null) return memo[n]; // {2}
    return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)); // {3}
  };
  return fibonacci;
}

console.log(fibonacciMemoization(9)(9));
