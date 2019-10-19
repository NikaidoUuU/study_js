// 내 풀이
function solution(n) {
  let m = n + 1;
  while (true) {
    if (
      n.toString(2).match(/[1]/g).length === m.toString(2).match(/[1]/g).length
    )
      return m;
  }
}

// 개선 01: 깔끔하게
function solution(n) {
  const origin = n.toString(2).match(/1/g).length;
  while (n++) {
    if (origin === n.toString(2).match(/1/g).length) return n;
  }
}

// 개선 02: 재귀
function solution(n, a = n + 1) {
  return n.toString(2).match(/1/g).length == a.toString(2).match(/1/g).length
    ? a
    : solution(n, a + 1);
}
