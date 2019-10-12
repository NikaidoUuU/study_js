// 내 풀이
function solution(n) {
  return n
    .split(" ")
    .map(vOne =>
      vOne
        .split("")
        .map((v, i) => (i % 2 === 0 ? v.toUpperCase() : v.toLowerCase()))
        .join("")
    )
    .join(" ");
}

// 개선 01: \w는 [A-Za-z0-9_]로 숫자영문자밑줄 포함,
function solution(s) {
  return s
    .toUpperCase()
    .replace(/(\w)(\w)/g, a => a[0].toUpperCase() + a[1].toLowerCase());
}
