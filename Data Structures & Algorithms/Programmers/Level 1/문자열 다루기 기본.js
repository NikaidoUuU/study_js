// 내 풀이
function solution(s) {
  return /^\d+$/.test(s) && [4, 6].includes(s.length);
}

// 개선 01: \d(숫자 문자)가 처음부터 끝까지 길이가 4개인 것 or 6개인 것
function solution(s) {
  return /^\d{4}$|^\d{6}$/.test(s);
}
