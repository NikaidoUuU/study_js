// 내 풀이
function solution(s) {
  const answer = s.split(" ").sort((a, b) => a - b);

  return answer[0] + " " + answer[answer.length - 1];
}

// 개선 01 : Min, Max와 Spread 활용
function solution(s) {
  const arr = s.split(" ");

  return Math.min(...arr) + " " + Math.max(...arr);
}
