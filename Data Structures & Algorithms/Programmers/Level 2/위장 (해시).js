// 내 풀이
function solution(clothes) {
  const hashtable = {};
  let answer = 1;

  for (let i = 0; i < clothes.length; i++) {
    if (!hashtable[clothes[i][1]]) {
      hashtable[clothes[i][1]] = 1;
    } else {
      hashtable[clothes[i][1]]++;
    }
  }

  for (let prop in hashtable) {
    answer *= hashtable[prop] + 1;
  }

  return answer - 1;
}

// 다른 풀이
function solution(clothes) {
  return (
    Object.values(
      clothes.reduce((obj, t) => {
        obj[t[1]] = obj[t[1]] ? obj[t[1]] + 1 : 1;
        return obj;
      }, {})
    ).reduce((a, b) => a * (b + 1), 1) - 1
  );
}
