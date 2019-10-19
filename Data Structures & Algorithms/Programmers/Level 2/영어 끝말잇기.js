// 내 풀이
function solution(n, words) {
  const set = new Set();
  let where = 0;

  words.some((v, i, arr) => {
    if (
      set.has(v) ||
      (arr[i - 1] !== undefined && arr[i - 1].endsWith(v[0]) === false)
    ) {
      where = i;
      return true;
    }
    set.add(v);
  });

  return where ? [(where % n) + 1, Math.ceil((where + 1) / n)] : [0, 0];
}

// 집합보다 배열이 빠른 이유가 뭘까..
function solution(n, words) {
  const temp = [];
  let where = 0;

  words.some((v, i, arr) => {
    if (
      temp.includes(v) ||
      (arr[i - 1] !== undefined && arr[i - 1].endsWith(v[0]) === false)
    ) {
      where = i;
      return true;
    }
    temp.push(v);
  });

  return where ? [(where % n) + 1, Math.ceil((where + 1) / n)] : [0, 0];
}
