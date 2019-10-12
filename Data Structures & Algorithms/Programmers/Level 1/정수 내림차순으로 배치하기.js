// 내 풀이
function solution(n) {
  return +String(n)
    .split("")
    .sort((a, b) => b - a)
    .join("");
}
