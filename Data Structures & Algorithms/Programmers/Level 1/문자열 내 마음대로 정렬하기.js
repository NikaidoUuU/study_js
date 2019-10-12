// 내 풀이
function solution(strings, n) {
  return strings.sort((a, b) =>
    a[n] === b[n] ? a.localeCompare(b) : a[n].localeCompare(b[n])
  );
}

// 개선 01: 이게 더 빠름
function solution(strings, n) {
  return strings.sort((a, b) => {
    if (a[n] === b[n]) {
      return (a > b) - (a < b);
    } else {
      return (a[n] > b[n]) - (a[n] < b[n]);
    }
  });
}
