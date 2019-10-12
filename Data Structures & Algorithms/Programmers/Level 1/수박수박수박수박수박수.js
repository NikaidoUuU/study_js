// 내 풀이
function solution(n) {
  return "수박".repeat(n / 2) + (n % 2 === 0 ? "" : "수");
}

// 다른 풀이
function solution(n) {
  return "수박".repeat(Math.ceil(n / 2)).substring(0, n);
}
