function solution(number, k) {
  const arr = [];

  for (let i = 0; i < number.length; i++) {
    let cur = number[i];
    while (k > 0 && arr.length > 0 && arr[arr.length - 1] < cur) {
      arr.pop();
      k--;
    }
    arr.push(cur);
  }

  arr.splice(arr.length - k, k);
  return arr.join("");
}
