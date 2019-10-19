function solution(arrangement) {
  const arr = [];
  let answer = 0;

  for (let i = 0; i < arrangement.length; i++) {
    if (arrangement[i] === "(") {
      arr.push(arrangement[i]);
    } else if (arrangement[i] === ")") {
      arr.pop();
      if (arrangement[i - 1] === "(") {
        answer += arr.length;
      } else {
        answer++;
      }
    }

    return answer;
  }
}
