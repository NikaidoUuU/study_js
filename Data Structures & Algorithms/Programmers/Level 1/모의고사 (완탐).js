// 내 풀이
function solution(answers) {
  function guessing(arr) {
    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
      if (arr[i % arr.length] === answers[i]) {
        correct++;
      }
    }
    return correct;
  }

  let max;
  const arr = [];
  const correctOne = guessing([1, 2, 3, 4, 5]);
  const correctTwo = guessing([2, 1, 2, 3, 2, 4, 2, 5]);
  const correctThree = guessing([3, 3, 1, 1, 2, 2, 4, 4, 5, 5]);

  if (correctOne >= correctTwo && correctOne >= correctThree) {
    max = correctOne;
  } else if (correctTwo >= correctOne && correctTwo >= correctThree) {
    max = correctTwo;
  } else {
    max = correctThree;
  }

  if (max === correctOne) arr.push(1);
  if (max === correctTwo) arr.push(2);
  if (max === correctThree) arr.push(3);

  return arr;
}

// 개선 01: correctOne을 fillter로 걸러서 받고, max 값을 Math.max 메서드를 사용해 구함
function solution(answers) {
  const arr = [];
  const one = [1, 2, 3, 4, 5];
  const two = [2, 1, 2, 3, 2, 4, 2, 5];
  const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const correctOne = answers.filter((v, i) => v === one[i % one.length]).length;
  const correctTwo = answers.filter((v, i) => v === two[i % two.length]).length;
  const correctThree = answers.filter((v, i) => v === three[i % three.length]).length;
  const max = Math.max(correctOne, correctTwo, correctThree);

  if (correctOne === max) arr.push(1);
  if (correctTwo === max) arr.push(2);
  if (correctThree === max) arr.push(3);

  return arr;
}


