// 내 풀이
function solution(arr) {
  return arr.filter((value, index) => !(arr[index - 1] === value));
}

// 다른 풀이
const solution = arr => arr.filter((v, i) => v !== arr[i + 1]);
