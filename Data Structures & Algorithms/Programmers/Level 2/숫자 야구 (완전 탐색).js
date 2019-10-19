function solution(baseball) {
  let answer = 0;

  for (let i = 123; i <= 987; i++) {
    const [x, y, z] = String(i).split("");

    if (x === "0" || y === "0" || z === "0") continue;
    if (x === y || x === z || y === z) continue;

    for (let j = 0; j < baseball.length; j++) {
      let strike = 0;
      let ball = 0;

      const [query, query_s, query_b] = baseball[j];
      const [query_x, query_y, query_z] = String(query).split("");

      if (query_x === "0" || query_y === "0" || query_z === "0") break;
      if (query_x === query_y || query_x === query_z || query_y === query_z)
        break;

      if (x === query_x) strike++;
      if (y === query_y) strike++;
      if (z === query_z) strike++;
      if (query_s !== strike) break;

      if (x === query_y || x === query_z) ball++;
      if (y === query_x || y === query_z) ball++;
      if (z === query_x || z === query_y) ball++;
      if (query_b !== ball) break;

      if (j === baseball.length - 1) answer++;
    }
  }

  return answer;
}
