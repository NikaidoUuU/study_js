/* setTimeout 만들어보기 */
const Item = class {
  time; // 몇 초 후에 실행될지
  block; // 그때 실행될 함수 block
  constructor(block, time) {
    this.block = block;
    this.time = time + performance.now();
  }
};

// 객체를 집어넣어야 되면 set에 넣어서 중복된 객체 방지
const queue = new Set();
const timeout = (block, time) => queue.add(new Item(block, time));

const f = time => {
  // time: performance.now()
  queue.forEach(item => {
    if (item.time > time) return;
    queue.delete(item);
    item.block();
  });
  requestAnimationFrame(f);
};
requestAnimationFrame(f);

timeout(() => console.log("hello"), 1000);
/* ----------------------------------------------------------------------------- */

/* Non Blocking For */
const working = () => {};

// Concurrency 모델이라 동기로 for문을 한번에 돌리면 다른 일을 할 수 없음
for (let i = 0; i < 100000; i++) working();

// 최대 몇 번을 돌 건데 한 번에 몇개를, 그 때마다 어떤 함수를
// 2ms안에 실행되고 제어권을 돌려주며 계속 엔진을 렌더링할 수 있음
const nbFor = (max, load, block) => {
  let i = 0;
  const f = time => {
    let curr = load;
    while (curr-- && i < max) {
      block();
      i++;
    }
    console.log(i);
    if (i < max - 1) timeout(f, 0);
  };
  timeout(f, 0);
};

nbFor(100, 10, working);
/* ----------------------------------------------------------------------------- */

/* Generator */
// 제너레이터는 유사 이터러블. 호출하면 이터레이터 객체가 튀어 나옴
// suspend: 메모리에 적재할 때 레코드라는 것으로 감쌈. yield를 실행할 때마다 멈춰줌
const infinity = (function*() {
  let i = 0;
  while (true) yield i++;
})();
console.log(infinity.next()); // next를 호출할 때마다 멈춘 곳에서 다시 실행

// "문"은 재활용하기 힘드므로 값으로 바꿈(자신을 멈춰서 외부에게 제어를 위임 가능)
const gene = function*(max, load, block) {
  let i = 0;
  let curr = load;
  while (i < max) {
    if (curr--) {
      block();
      i++;
    } else {
      curr = load;
      console.log(i);
      yield;
    }
  }
};

const nbFor = (max, load, block) => {
  const iterator = gene(max, load, block);
  const f = () => iterator.next().done || timeout(f);
  timeout(f, 0);
};

nbFor(100, 10, working);
/* ----------------------------------------------------------------------------- */

/* Promise */
// 콜백 구조는 비동기 제어권을 갖지 못 한다. (언제 호출되지 모름)
// 반(half)제어: 어떤 메모리 공간에 서버에서 전달받은 것을 저장해서 우리가 원할 때 콜백을 호출 Promise.then
const gene2 = function*(max, load, block) {
  let i = 0;
  while (i < max) {
    yield new Promise(res => {
      let curr = load;
      while (curr-- && i < max) {
        block();
        i++;
      }
      console.log(i);
      timeout(res, 0);
    });
  }
};

const nbFor = (max, load, block) => {
  const iterator = gene2(max, load, block); // Promise 반환
  const next = ({ value, done }) =>
    done || value.then(v => next(iterator.next()));
  next(iterator.next());
};
/* ----------------------------------------------------------------------------- */
