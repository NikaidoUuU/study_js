let factorial = {
  [Symbol.iterator]() {
    let count = 1;
    let cur = 1;
    return {
      next() {
        [count, cur] = [count + 1, cur * count];
        return { done: false, value: cur };
      }
    };
  }
};
for (let n of factorial) {
  if (n > 10000000) {
    break;
  }
  console.log(n); // 1 false, 2 false, 6 false...
}
// iterator : 중간에 멈출 수가 없음

function* factGenerator() {
  let count = 1;
  let cur = 1;
  while (true) {
    [count, cur] = [count + 1, cur * count];
    yield cur;
  }
}
let factGen = factGenerator();
factGen.next(); // 1 , false
factGen.next(); // 2 , false
factGen.next(); // 6 , fasle...
// generator : Symbol.iterator 속성을 가지므로 for ~ of문도 가능하고 yield로 중단했다 재개도 가능

function* stringCutter(string) {
  yield* string;
}
const cutter = stringCutter("Zero");
cutter.next().value; // 'Z'
cutter.next().value; // 'e'
// yield* : 해당 값을 자동으로 쪼개 반복(Symbol.iterator 있는 값만)
// cutter.return(); 생성기가 멈추고 done은 true
// cutter.throw(); 생성기가 멈추고, 추가로 에러를 만듦(catch 구문으로 보냄)

function* deliverGenerator() {
  console.log("generator called");
  let val = yield;
  console.log("1st", val);
  val = yield 2;
  console.log("2nd", val);
  val = yield;
  console.log("3rd", val);
}
let delGen = deliverGenerator();
delGen.next(1); // 'generator called'
delGen.next(2); // '1st 2', next의 value는 2
delGen.next(3); // '2nd 3'
delGen.next(4); // '3rd 4', next의 done은 true
// next()를 통해 생성기에 값 전달도 가능, 첫번째 값 전달은 무시됨

function async(gen) {
  let iterator = gen();
  let result;
  (function iterate(val) {
    result = iterator.next(val); // yield에 값을 전달
    if (!result.done) {
      // iterator의 끝까지 반복
      if (result.value.then) {
        // result의 value가 promise 객체이면
        result.value.then(iterate); // promise의 then을 실행
      } else {
        // promise 객체가 아니면
        setTimeout(() => {
          // 비동기로
          iterate(result.value); // 다음 value를 yield로 보내서 처리
        }, 0);
      }
    }
  })();
}
