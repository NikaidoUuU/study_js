// 내 풀이
function solution(skill, skill_trees) {
  return skill_trees.filter(v => {
    const skillArr = skill.split("");

    for (let i = 0; i < v.length; i++) {
      for (let j = 0; j < skillArr.length; j++) {
        if (v[i] === skillArr[j]) {
          skillArr.shift();
        }
        if (v[i] === skillArr[j + 1]) {
          return false;
        }
      }
    }

    return true;
  }).length;
}

// 개선 01
// 1. 정규식을 사용하여 선행 스킬을 제외한 모든 문자를 제거한다.
// 2. 제외하고 남은 문자열들의 길이를 저장하고,
// 3. 해당 문자열과 선행 스킬을 비교한다.

// 위 세 단계를 스킬 트리의 길이만큼 반복해서 진행한다.
function solution(skill, skill_trees) {
  const regex = new RegExp(`[^${skill}]`, "g");

  return skill_trees
    .map(v => v.replace(regex, ""))
    .filter(v => skill.indexOf(v) === 0).length;
}
