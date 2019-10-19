function solution(numbers) {
  let answer = 0;
  const set = new Set();

  function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
  }

  (function combine(a, s) {
    if (s.length > 0) {
      if (!set.has(Number(s))) {
        set.add(Number(s));
        if (isPrime(Number(s))) {
          answer++;
        }
      }
    }

    if (a.length > 0) {
      for (let i = 0; i < a.length; i++) {
        const t = a.slice(0);
        t.splice(i, 1);
        combine(t, s + a[i]);
      }
    }
  })(numbers.split(""), "");

  return answer;
}
