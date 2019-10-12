// 내 풀이
function solution(s) {
  return s.length % 2 === 0
    ? s.slice(Math.floor(s.length / 2) - 1, Math.floor(s.length / 2) + 1)
    : s.slice(Math.floor(s.length / 2), Math.floor(s.length / 2) + 1);
}

// ceil과 subst으로 가져올 것만
function solution(s) {
  return s.substring(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}
