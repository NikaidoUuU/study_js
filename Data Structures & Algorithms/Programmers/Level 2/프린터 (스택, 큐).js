// 내 풀이 정규식 오기로 해봄
function solution(priorities, location) {
  priorities[location] += "target";
  const arr = [];

  while (priorities.length > 0) {
    arr.push(priorities.shift());

    if (
      priorities.some(v =>
        typeof arr[arr.length - 1] === "string"
          ? v > Number(arr[arr.length - 1].replace(/\D/g, ""))
          : typeof v === "string"
          ? Number(v.replace(/\D/g, "")) > arr[arr.length - 1]
          : v > arr[arr.length - 1]
      )
    ) {
      priorities.push(arr.pop());
    }
  }

  return arr.findIndex(v => typeof v === "string") + 1;
}

// 개선 01: 객체 이용
function solution(priorities, location) {
  const arr = [];
  const list = priorities.map((v, i) => ({
    value: v,
    locate: i === location
  }));

  while (list.length > 0) {
    arr.push(list.shift());
    if (list.some(v => v.value > arr[arr.length - 1].value)) {
      list.push(arr.pop());
    }
  }

  return arr.findIndex(v => v.locate) + 1;
}
