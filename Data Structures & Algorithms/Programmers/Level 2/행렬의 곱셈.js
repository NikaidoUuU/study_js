function solution(arr1, arr2) {
  return arr1.map((__, i) =>
    arr2[0].map((__, j) => arr1[i].reduce((a, c, k) => a + c * arr2[k][j], 0))
  );
}
