// 내 풀이
function solution(array, commands) {
  return commands.map(
    command => array.slice(command[0] - 1, command[1]).sort((a, b) => a - b)[command[2] - 1]
  );
}

// 개선 01: array destructuring을 사용해 명시적으로 표현
const solution = (arr, commands) => commands.map(([from, to, k]) => arr.slice(from - 1, to).sort((a, b) => a - b)[k - 1]);