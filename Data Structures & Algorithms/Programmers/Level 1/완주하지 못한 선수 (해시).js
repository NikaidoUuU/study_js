// 내 풀이
function solution(participant, completion) {
  const hashtable = {};

  participant.forEach(value => {
    if (!hashtable[value]) {
      hashtable[value] = 1;
    } else {
      hashtable[value]++;
    }
  });

  completion.forEach(value => {
    if (hashtable[value]) {
      hashtable[value]--;
    }
  });

  const arrTemp = [];
  for (let prop in hashtable) {
    if (hashtable[prop] > 0) {
      arrTemp.push(prop);
    }
  }

  const answer = arrTemp.join("");

  return answer;
}

// 개선 01: sort 메서드를 활용해 간단하게 짰지만 느림
function solution(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant[i];
    }
  }
}

// 개선 02: for in 구문에서 return으로 키 값만 넘겨줘도 됐음
function solution(participant, completion) {
  const hashtable = {};

  participant.forEach(value => {
    if (!hashtable[value]) {
      hashtable[value] = 1;
    } else {
      hashtable[value]++;
    }
  });

  completion.forEach(value => {
    if (hashtable[value]) {
      hashtable[value]--;
    }
  });

  for (let prop in hashtable) {
    if (hashtable[prop] > 0) {
      return prop;
    }
  }
}
