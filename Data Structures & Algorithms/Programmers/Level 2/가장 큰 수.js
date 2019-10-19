// 내 풀이
function solution(numbers) {
  const answer = numbers
    .map(v => String(v))
    .sort((a, b) => (b + a < a + b ? 1 : -1))
    .join("");

  return answer[0] === "0" ? "0" : answer;
}

// 추가
function solution(numbers) {
  const answer = numbers
    .map(v => String(v))
    .sort((a, b) => (a + b < b + a ? 1 : -1))
    .join("");

  return answer[0] === "0" ? "0" : answer;
}
