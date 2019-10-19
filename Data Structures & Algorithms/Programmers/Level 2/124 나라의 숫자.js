function solution(n) {
  return n ? solution(parseInt((n - 1) / 3)) + [1, 2, 4][(n - 1) % 3] : "";
}
