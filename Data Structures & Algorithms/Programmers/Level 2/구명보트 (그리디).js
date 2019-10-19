function solution(people, limit) {
  people.sort((a, b) => a - b);
  let i = 0;
  let j = people.length - 1;

  for (i; i < j; j--) {
    if (people[i] + people[j] <= limit) i++;
  }

  return people.length - i;
}
