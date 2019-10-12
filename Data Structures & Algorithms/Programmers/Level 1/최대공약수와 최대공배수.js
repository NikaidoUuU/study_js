// 내 풀이
const euclid = (n, m) => (m % n ? euclid(m % n, n) : n);

function solution(n, m) {
  const gcd = euclid(n, m);
  const lcm = (n * m) / gcd;
  return [gcd, lcm];
}
