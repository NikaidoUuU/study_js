// 내 풀이
function solution(n) {
  return [...String(n)].reduce((a, c) => a + Number(c), 0);
}
