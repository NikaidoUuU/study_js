// 내 풀이
function solution(n, lost, reserve) {
  let num = 0;

  const L = lost
    .sort((a, b) => a - b)
    .filter(value => !reserve.includes(value));
  const R = reserve
    .sort((a, b) => a - b)
    .filter(value => !lost.includes(value));

  L.forEach(value => {
    R.forEach((value2, index2) => {
      if (value - 1 === value2 || value + 1 === value2) {
        R.splice(index2, 1);
        num++;
      }
    });
  });

  return n - (L.length - num);
}

// 개선 01: sort 없애고 forEach 대신 filter와 findIndex로 해결
function solution(n, lost, reserve) {
  const L = lost.filter(value => !reserve.includes(value));
  const R = reserve.filter(value => !lost.includes(value));

  return n - L.filter(l => {
    const have = R.findIndex(r => Math.abs(r - l) === 1);
    if (have === -1) return true;
    R.splice(have, 1);
  }).length
}