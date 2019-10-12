// 내 풀이
function solution(a, b) {
  return Array(Math.abs(b - a) + 1)
    .fill()
    .map((__, i) => (a < b ? a + i : a - i))
    .reduce((a, c) => a + c);
}

// 개선 01: WOW
const solution = (a, b) => ((a + b) * (Math.abs(b - a) + 1)) / 2;
