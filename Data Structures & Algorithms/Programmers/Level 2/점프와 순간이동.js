function solution(n) {
  let answer = 1;

  while (n !== 1) {
    if (Number.isInteger(n / 2)) {
      n /= 2;
    } else {
      n -= 1;
      answer++;
    }
  }

  return answer;
}
