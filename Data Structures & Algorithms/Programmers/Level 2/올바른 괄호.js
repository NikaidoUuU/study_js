// 내 풀이
function solution(s) {
  const arr = [];

  for (let i = 0; i < s.length; i++) {
    const cur = s[i];
    if (cur === "(") {
      arr.push(cur);
    } else if (cur === ")") {
      if (arr.length === 0) return false;
      arr.pop();
    }
  }

  return arr.length === 0;
}
