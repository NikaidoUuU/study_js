// 내 풀이
function solution(arr, divisor) {
  const answer = arr
    .filter(value => Number.isInteger(value / divisor))
    .sort((a, b) => a - b);

  return answer.length ? answer : [-1];
}

// 개선 01: 정수로 확인하는 대신 10 % 5 === 0 이렇게 확인하고 sort 할지를 리턴할 때 확인
function solution(arr, divisor) {
  const answer = arr.filter(v => v % divisor === 0);

  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}
