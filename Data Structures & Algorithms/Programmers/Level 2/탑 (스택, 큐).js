// 내 풀이
function solution(heights) {
  return heights.map((v, i, arr) => {
    while (i > 0) {
      if (arr[i - 1] > v) return i;
      i--;
    }
    return 0;
  });
}
