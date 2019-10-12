// 내 풀이
function solution(phone_number) {
  return phone_number
    .split("")
    .map((v, i, arr) => {
      if (i >= arr.length - 4) return v;
      return "*";
    })
    .join("");
}

// 개선 01: lookahead
function solution(phone_number) {
  return phone_number.replace(/\d(?=\d{4})/g, "*");
}
