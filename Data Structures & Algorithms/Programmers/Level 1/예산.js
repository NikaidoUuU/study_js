// 내 풀이
function solution(d, budget) {
  d.sort((a, b) => a - b).reduce((a, c, i, arr) => {
    if (a + c > budget) arr.splice(i);
    return a + c;
  }, 0);

  return d.length;
}

// 다른 풀이
function solution(d, budget) {
  d.sort((a, b) => a - b);

  while (d.reduce((a, b) => a + b, 0) > budget) d.pop();

  return d.length;
}
