// 내 풀이
function solution(x) {
  return x %
    String(x)
      .split("")
      .reduce((a, c) => a + Number(c), 0)
    ? false
    : true;
}

// 다른 풀이
function solution(x) {
  return !(
    x %
    String(x)
      .split("")
      .reduce((a, c) => a + Number(c), 0)
  );
}
