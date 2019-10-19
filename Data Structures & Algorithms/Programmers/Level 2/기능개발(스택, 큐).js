// 내 풀이
function solution(progresses, speeds) {
  const nowDev = [];
  const answer = [];

  progresses.forEach((v, i) => nowDev.push({ progre: v, speed: speeds[i] }));

  while (nowDev.length > 0) {
    // 개발
    nowDev.map(v => (v.progre += v.speed));

    // 배포
    let count = 0;
    while (nowDev[0].progre >= 100) {
      nowDev.shift();
      count++;
      if (nowDev.length === 0) break;
    }
    if (count > 0) answer.push(count);
  }

  return answer;
}
