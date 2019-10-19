function solution(s) {
  const arr = [];
  s = s.split("");

  for (let i = 0; i < s.length; i++) {
    arr.push(s[i]);
    if (arr[arr.length - 2] === arr[arr.length - 1]) {
      arr.pop();
      arr.pop();
    }
  }

  return arr.length ? 0 : 1;
}
