// 내 풀이
function solution(n) {
  let answer = 0;
  for (let i = n; i >= 1; i--) {
    if (n % i === 0) answer += i;
  }

  return answer;
}

// 다른 풀이: n % c가 0(약수)이면 false니 acc + cur 해줌
function solution(n) {
  return Array(Math.floor(n / 2))
    .fill()
    .map((__, i) => i + 1)
    .reduce((a, c) => (n % c ? a : a + c), n);
}
