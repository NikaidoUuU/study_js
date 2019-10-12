// 내 풀이
function solution(x, n) {
  return Array(n)
    .fill()
    .map((__, i) => (i + 1) * x);
}

// 다른 풀이
function solution(x, n) {
  return [...Array(n).keys()].map(v => (v + 1) * x);
}
