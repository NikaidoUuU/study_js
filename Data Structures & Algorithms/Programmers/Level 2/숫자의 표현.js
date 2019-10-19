// 내 풀이
function solution(n) {
  return Array(n)
    .fill()
    .map((__, i) => i + 1)
    .filter(v => !(n % v) && v % 2).length;
}
