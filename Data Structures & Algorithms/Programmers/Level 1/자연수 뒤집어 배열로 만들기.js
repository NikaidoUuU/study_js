// 내 풀이
function solution(n) {
  return String(n)
    .split("")
    .reverse()
    .map(v => +v);
}
