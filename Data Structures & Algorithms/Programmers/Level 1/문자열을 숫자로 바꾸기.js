// 내 풀이
function solution(s) {
  return s.slice(0, 1) === "-" ? -Number(s.slice(1, 5)) : Number(s.slice(0, 5));
}

// 개선 01: 그냥 문자열을 숫자로 사칙연산해서 파싱해주면 됨....
const solution = s => +s;
