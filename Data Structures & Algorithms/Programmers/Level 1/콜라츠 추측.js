function solution(num, count = 0) {
  if (num === 1) return count;
  if (count === 500) return -1;

  return solution(num % 2 ? num * 3 + 1 : num / 2, count + 1);
}
