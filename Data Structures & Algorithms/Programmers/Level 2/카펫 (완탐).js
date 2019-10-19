function solution(brown, red) {
  const arr = [];
  const total = brown + red;
  const max = Math.sqrt(total);

  for (let i = 3; i <= max; i++) {
    if (total % i === 0) {
      const temp = total / i;

      if ((i - 2) * (temp - 2) === red) {
        arr.push(temp);
        arr.push(i);
      }
    }
  }

  return arr;
}
