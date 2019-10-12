// DP Bottom-up
function solution(n) {
  const arr = [0, 1];
  for (let i = 1; i <= n; i++) {
    arr.push((arr[i - 1] + arr[i]) % 1234567);
  }
  return arr[n];
}
