// 내 풀이
function solution(arr) {
  if (arr.length < 1) return [-1];

  const min = arr.reduce((a, c) => Math.min(a, c));
  return arr.filter(v => v !== min);
}

// 개선 01
function solution(arr) {
  const min = Math.min(...arr);
  const filtering = arr.filter(v => v !== min);
  return filtering.length ? filtering : [-1];
}
