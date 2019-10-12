// 내 풀이
function solution(s) {
  s = s.toUpperCase();
  let p = 0;
  let y = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "P") {
      p++;
    } else if (s[i] === "Y") {
      y++;
    }
  }

  return p === y;
}

// 개선 01: 정규식 사용, match로 할려면 p나 y가 없을 경우 null이라 length가 없으므로 예외 처리를 해줘야됨
const solution = s =>
  s.replace(/p/gi, "").length === s.replace(/y/gi, "").length;

// 개선 02: p 기준으로 배열 나눈 거 길이로 비교
function solution(s) {
  return (
    s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length
  );
}
