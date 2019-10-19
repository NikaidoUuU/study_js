// 내 풀이
function gcd(a, b) {
  return a % b ? gcd(b, a % b) : b;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function solution(arr) {
  const N = [lcm(arr[0], arr[1])];

  for (let i = 2; i < arr.length; i++) {
    N.push(lcm(N.shift(), arr[i]));
  }

  return N[0];
}

// 개선 01: reduce 활용
function gcd(a, b) {
  return a % b ? gcd(b, a % b) : b;
}

function lcmN(arr) {
  return arr.reduce((a, c) => (a * c) / gcd(a, c));
}
function solution(s) {
  function doS(s) {
    for (let i = 0; i < s.length; i++) {
      if (s[i] === s[i + 1]) {
        s.splice(i, 2);
        break;
      }
    }
  }

  return s.length ? 0 : 1;
}
