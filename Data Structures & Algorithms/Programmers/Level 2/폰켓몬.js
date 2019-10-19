// 내 풀이
function solution(nums) {
  const set = [...new Set(nums)];

  return set.length > nums.length / 2 ? nums.length / 2 : set.length;
}
