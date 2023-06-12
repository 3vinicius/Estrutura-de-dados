const recursionFatorial = n => {
  console.trace();
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * recursionFatorial(n - 1);
};

// let i = 0;
// function recursiveFn() {
//   i++;
//   recursiveFn();
// }
// try {
//   recursiveFn();
// } catch (er) {
//   console.log(`i= ${i}error:${er}`);
// }

const fibonacci = n => {
  if (n < 1) {
    return 0;
  }
  if (n <= 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

function fibonacciMemo(n) {
  const memo = [0, 1];

  const fib = (n) => {
    console.log(memo);
    if (memo[n] != null) return memo[n];
    return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));
  };
  return fib(n);
}

console.log(fibonacciMemo(6));
