/* Context & Switch */
// 스위치 구문을 이용하고 컨텍스트를 공유시켜서 상태를 전환해서 제너레이터 만들어보기(CPS)
const gene = function*(a) {
  let b;
  yield a;
  b = a;
  yield b;
};

const iter = gene(3);
for (const i of iter) console.log(i);

// ES5 바벨
// wrap는 이터레이터 객체를 반환
var gene = regeneratorRuntime.mark(function gene(a) {
  var b;
  return regeneratorRuntime.wrap(function gene$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return a;
        case 2:
          b = a;
          _context.next = 5;
          return b;
        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, gene);
});

const gene2 = a => {
  let b;
  return wrap(_context => {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return a;
        case 2:
          b = a;
          _context.next = 5;
          return b;
        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

const wrap = block => new SwitchIterable(block);

const SwitchIterable = class {
  #block;
  constructor(block) {
    this.#block = block;
  }
  [Symbol.iterator]() {
    return new SwitchIterator(this.#block);
  }
};

const SwitchIterator = class {
  static done = { done: true };
  #block;
  #context = new Context();
  constructor(block) {
    this.#block = block;
  }
  next() {
    const value = this.#block(this.#context);
    return value === Context.stop
      ? SwitchIterator.done
      : { value, done: false };
  }
};

const Context = class {
  static stop = Symbol(); // 상수값
  prev = 0;
  next = 0;
  stop() {
    return Context.stop;
  }
};

const iter2 = gene2(4);
for (const i of iter2) console.log(i);
/* ----------------------------------------------------------------------------- */

/* Continuation & Resume */
// Switch문으로 관리하면 너무 거대해져서 Switch 케이스 하나당 객체로 보도록 만듦
const gene4 = a => {
  let b;
  return new SeqIterable(
    // 노드간의 연결은 노드의 책임인데
    // 이 함수들을 이터러블 -> 이터레이터에서 관리해버리게 됨
    cont => {
      cont.resume(a);
    },
    cont => {
      b = a;
      cont.resume(b);
    }
  );
};

const SeqIterable = class {
  #blocks;
  constructor(...blocks) {
    this.#blocks = blocks;
  }
  [Symbol.iterator]() {
    return new SeqIterator(this.#blocks.slice(0));
  }
};

const seqIterator = class {
  static done = { done: true };
  #blocks;
  #cont = new Continuation();
  constructor(blocks) {
    this.#blocks = blocks;
  }
  next() {
    if (!this.#blocks.length) return seqIterator.done;
    const cont = this.#cont;
    cont.stop();
    this.#blocks.shift()(cont); // resume이 없으면 isStop에 걸림
    return cont.isStop()
      ? SeqIterator.done
      : { value: cont.value(), done: false }; // value 값은 resume의 인자
  }
};

const Continuation = class {
  static #stop = Symbol();
  #value;
  resume(v) {
    this.#value = v;
  }
  value() {
    return this.#value;
  }
  stop() {
    this.#value = Continuation.#stop;
  }
  isStop() {
    return this.#value === Continuation.#stop;
  }
};

// 위의 코드처럼 외부에게 흐름을 맡기게 짜면(this.#block.shift()(cont)가 강제됨)
// 예를 들어 아래 코드의 case 0 -> 1 -> 0식으로 무한루프 도는 코드등등 여러 코드에 대응 불가
const gene = function*(a) {
  let b;
  // 제어문이 끝나면 stack clear가 됨.
  // CPS도 stack clear의 구조를 흉내내니 스택에 안 쌓임
  while (1) {
    a++;
    b = a;
    yield b;
  }
};

// ES5 바벨
var gen6 = regeneratorRuntime.mark(function gene(a) {
  var b;
  return regeneratorRuntime.wrap(function gene$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          if (!1) {
            _context.next = 7;
            break;
          }
          a++;
          b = a;
          _context.next = 5;
          return b;
        case 5:
          _context.next = 0;
          break;
        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, gene);
});

// 특별히 지정하지 않으면 순서대로 내려옴
// 첫번째 함수는 값을 반환하지 않음
// 두번째 함수는 첫번째 함수를 알아야 함
// !!외부 제어를 피하고 내부에서 결정함!!
// continuation.isPass() 도입
// continuation.key 및 map저장소 도입
// continuation 내부에 next로 관리
const gene = a => {
  let b;
  return new Sequence(
    new Continuation(0, cont => {
      if (!1) cont.stop();
      cont.resume();
    })
  ).next(
    new Continuation(1, cont => {
      a++;
      b = a;
      cont.resume(b, 0);
    })
  );
};

const Sequence = class {
  #table = new Map();
  #cont;
  #end;
  constructor(cont) {
    this.#cont = this.#end = cont;
    cont.setSequence(this);
  }
  next(cont) {
    this.#end.setNext(cont);
    this.#end = cont;
    cont.setSequence(this);
    return this;
  }
  getCont(key) {
    if (!this.#table.has(key)) throw `no key:${key}`;
    return this.#table.get(key);
  }
  setCont(key, cont) {
    if (this.#table.has(key)) throw `exist key:${key}`;
    return this.#table.set(key, cont);
  }
  [Symbol.iterator]() {
    return new Iterator(this.#cont);
  }
};

const Continuation = class {
  static #stop = Symbol();
  static #pass = Symbol();
  #key;
  #block;
  #value;
  #next;
  #seq;
  constructor(key, block) {
    (this.#key = key), (this.#block = block);
  }
  setSequence(seq) {
    this.#seq = seq;
    seq.setCont(this.#key, this);
  }
  setNext(cont) {
    this.#next = cont;
  }
  getNext() {
    return this.#next;
  }
  suspend() {
    this.#value = Continuation.#stop;
    this.#block(this);
  }
  resume(v = Continuation.#pass, next) {
    this.#value = v;
    if (next !== undefined) this.#next = this.#seq.getCont(next);
  }
  value() {
    return this.#value;
  }
  isStop() {
    return this.#value === Continuation.#stop;
  }
  isPass() {
    return this.#value === Continuation.#pass;
  }
};

const Iterator = class {
  static done = { done: true };
  #target;
  constructor(cont) {
    this.#target = cont;
  }
  next() {
    const target = this.#target;
    if (target === undefined) return Iterator.done;
    target.suspend();
    if (target.isStop()) return Iterator.done;
    if (target.isPass()) {
      this.#target = target.getNext();
      return this.next();
    } else {
      const result = { value: target.value(), done: false };
      this.#target = target.getNext();
      return result;
    }
  }
};

let i = 10;
for (let j of gene(0)) {
  if (i--) console.log(j);
  else break;
}
/* ----------------------------------------------------------------------------- */
