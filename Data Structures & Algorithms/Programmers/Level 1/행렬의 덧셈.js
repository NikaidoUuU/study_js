// 내 풀이
function solution(arr1, arr2) {
  return arr1.map((v, i) => v.map((v2, i2) => v2 + arr2[i][i2]));
}
