// 내 풀이
function isPrime(n) {
  // if (n <= 1) return false; n이 2부터 시작이므로 필요 없음
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}

function solution(n) {
  let result = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) result++;
  }

  return result;
}
