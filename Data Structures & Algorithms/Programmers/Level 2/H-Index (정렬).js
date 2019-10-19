function solution(citations) {
  const arr = citations.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(Math.min(arr[i], arr.length - i));
  }

  return Math.max(...result);
}
