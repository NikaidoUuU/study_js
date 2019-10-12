// 내 풀이
function solution(s, n) {
  return s
    .split("")
    .map(v => {
      return v === " "
        ? v
        : v.charCodeAt() + n > 122 ||
          (v.charCodeAt() + n > 90 && v.charCodeAt() <= 90)
        ? String.fromCharCode(v.charCodeAt() + n - 26)
        : String.fromCharCode(v.charCodeAt() + n);
    })
    .join("");
}

// 다른 풀이
function solution(s, n) {
  return s.replace(
    /[a-z]/gi,
    c =>
      [
        (c = c.charCodeAt(0)),
        String.fromCharCode((c & 96) + (((c % 32) + n - 1) % 26) + 1)
      ][1]
  );
}
