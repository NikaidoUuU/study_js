// 내 풀이
function solution(s) {
  return s
    .split("")
    .sort()
    .reverse()
    .join("");
}

// 다른 풀이
function solution(s) {
  return s
    .split("")
    .sort((a, b) => (a < b ? 1 : -1))
    .join("");
}
