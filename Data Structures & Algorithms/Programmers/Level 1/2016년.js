// 내 풀이
function solution(a, b) {
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return week[new Date(2016, a - 1, b).getDay()];
}

// 이렇게도 풀 수 있음
function solution(a, b) {
  const date = new Date(2016, a - 1, b);

  return date
    .toString()
    .slice(0, 3)
    .toUpperCase();
}
