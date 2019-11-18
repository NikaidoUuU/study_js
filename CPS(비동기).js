/* Sequential Async */
// 시퀀셜하지 않음
const render = function(...urls) {
  Promise.all(
    urls.map(url => fetch(url, { method: "GET" }).then(res => res.json()))
  ).then(arr => arr.forEach(console.log));
};
render("1.json", "2.json", "3.json");

// 관심사 분리가 돼있지 않음
const render = function(...urls) {
  const loop = () => {
    if (urls.length) {
      fetch(urls.shift(), { method: "GET" })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          loop();
        });
    }
  };
  loop();
};
render("1.json", "2.json", "3.json");
/* ----------------------------------------------------------------------------- */

/* Generator & Executor */
// 단일 원칙 책임을 못 지킴
const dataLoader = function*(f, ...urls) {
  for (const url of urls) {
    const json = yield fetch(url, { method: "GET" }).then(res => res.json());
    f(json);
  }
};
const render = function(...urls) {
  const iter = dataLoader(console.log, ...urls);
  const next = ({ value, done }) => {
    if (!done) value.then(v => next(iter.next(v)));
  };
  next(iter.next());
};
render("1.json", "2.json", "3.json");

// dataLoader의 데이터 처리와 렌더링 처리를 분리
const dataLoader = function*(...urls) {
  for (const url of urls) {
    const json = yield fetch(url, { method: "GET" }).then(res => res.json());
    yield json;
  }
};
const render = function(...urls) {
  const iter = dataLoader(...urls);
  const next = ({ value, done }) => {
    if (!done) {
      if (value instanceof Promise) {
        value.then(v => next(iter.next(v)));
      } else {
        console.log(value);
        next(iter.next());
      }
    }
  };
  next(iter.next());
};
render("1.json", "2.json", "3.json");
/* ----------------------------------------------------------------------------- */

/* Async Iterator */

// yield가 없어서 밖에 위임 불가, 완결성을 가져야 함
const render = async function(...urls) {
  for (const url of urls) {
    console.log(await (await fetch(url, { method: "GET" })).json());
  }
};
render("1.json", "2.json", "3.json");

//
const dataLoader = async function*(...urls) {
  for (const url of urls) {
    yield await (await fetch(url, { method: "GET" })).json();
  }
};
const render = async function(...urls) {
  for await (const json of dataLoader(...urls)) {
    console.log(json);
  }
};
render("1.json", "2.json", "3.json");

/* Async yield* */

// async iterable을 부를 땐 * 붙임
const urlLoader = async function*(url) {
  yield await (await fetch(url, { method: "GET" })).json();
};
const dataLoader = async function*(...urls) {
  for (const url of urls) yield* urlLoader(url);
};
const render = async function(...urls) {
  for await (const json of dataLoader(...urls)) {
    console.log(json);
  }
};
render("1.json", "2.json", "3.json");

/* ----------------------------------------------------------------------------- */

/* Async Group */
// 1번과 2번 로딩 후 3번
const start = function*(url) {
  yield "load start";
};
const end = function*(url) {
  yield "load end";
};
const url = async function*(url) {
  yield await (await fetch(url, { method: "GET" })).json();
};
const urls = async function*(...urls) {
  const r = [];
  for (const u of urls.map(url)) r.push((await u.next()).value);
  yield r;
};
const dataLoader = async function*(...aIters) {
  // 그냥 iterable(start, end)도 async iterable도 소화 가능
  for (const iter of aIters) yield* iter;
};
const render = async function(...aIters) {
  for await (const json of dataLoader(...aIters)) console.log(json);
};
render(start(), urls("1.json", "2.json"), url("3.json"), end());
/* ----------------------------------------------------------------------------- */

/* Pass Param */
const url = (url, opt = { method: "POST" }) => new Url(url, opt);
const Url = class {
  #url;
  #opt;
  constructor(url, opt) {
    this.#url = url;
    this.#opt = opt;
  }
  async *load() {
    yield await (await fetch(this.#url, this.#opt)).json();
  }
};
const start = function*(url) {
  yield "load start";
};
const end = function*(url) {
  yield "load end";
};
const urls = async function*(...urls) {
  for (const url of urls) r.push((await url.load().next()).value);
  yield r;
};
const dataLoader = async function*(...aIters) {
  for (const iter of aIters) yield* iter;
};
const render = async function*(...aIters) {
  for await (const json of dataLoader(...aIters)) {
    console.log(json);
  }
};
render(start(), urls(url("1.json"), url("2.json")), end());
/* ----------------------------------------------------------------------------- */

/* Async Iterator Class */
const AIter = class {
  update(v) {}
  async *load() {
    throw "override";
  }
};

const url = (u, opt = { method: "POST" }) => new Url(u, opt);
const Url = class extends AIter {
  #url;
  #opt;
  constructor(u, opt) {
    super();
    this.#url = u;
    this.#opt = opt;
  }
  update(json) {
    if (json) this.#opt.body = JSON.stringify(json);
  }
  async *load() {
    console.log("body", this.#opt.body);
    yield await (await fetch(this.#url, this.#opt)).json();
  }
};

const urls = (...urls) => new Urls(...urls.map(u => url(u)));
const Urls = class extends AIter {
  #urls;
  #body;
  constructor(...urls) {
    super();
    this.#urls = urls;
  }
  update(json) {
    this.#body = json;
  }
  async *load() {
    const r = [];
    for (const url of this.#urls) {
      url.update(this.#body);
      r.push((await url.load().next()).value);
    }
    yield r;
  }
};

const Start = class extends AIter {
  async *load() {
    yield "load start";
  }
};
const End = class extends AIter {
  async *load() {
    yield "load end";
  }
};
const START = new Start();
const END = new END();

const dataLoader = async function*(...aIters) {
  let prev;
  for (const iter of aIters) {
    iter.update(prev);
    prev = (await iter.load().next()).value;
    yield prev;
  }
};

const render = async function(...aIters) {
  for await (const json of dataLoader(...aIters)) {
    console.log(json);
  }
};

render(START, urls("1.json", "2.json"), url("3.json"), END);
/* ----------------------------------------------------------------------------- */
