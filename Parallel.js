/* Web Worker */
// Foreground Thread, 메인 스레드
const worker = new Worker("a.js"); // 메인 스레드에서 워커를 생성해 Background Thread 생성 대기
worker.postMessage("hello"); // Background Thread 활성화
worker.onmessage = ({ data }) => {
  console.log(data); // world;
};

// Background Thread a.js, 따로 context 객체를 가지고 있고 메인 스레드랑만 통신 가능
onemessage = ({ data }) => {
  console.log(data); // hello
  postMessage("world");
};

/* URL & Blob */
// Blob: 파일 객체 덩어리를 만들 수 있음
// 첫 번째 인자 배열, 두 번째 인자 mime type
const worker = new Worker(
  URL.createObjectURL(
    new Blob(
      [
        `onemessage = ({ data }) => {
  console.log(data); 
  postMessage("world");
};`
      ],
      { type: "text/javascript" }
    )
  )
);
// 메모리상에 존재하는 Blob 객체를 주소화, 일회성
// http://localhost:63342/757c5194-0897-4166-817d-ddd4fa684e01

/* workerPromise */
const mine = { js: { type: "text/javascript" } };

const WorkerPromise = f => {
  let resolve;
  let reject;
  const worker = Object.assign(
    new Worker(
      URL.createObjectURL(
        new Blob([`onmessage = e => postMessage((${f})(e.data));`], mine.js)
      )
    ),
    { onmessage: e => resolve(e.data), onerror: e => reject(e.data) }
  );

  return data =>
    new Promise((res, rej) => {
      resolve = res;
      reject = rej;
      worker.postMessage(data);
    });
};

const addWorld = WorkerPromise(str => str + " world");
addWorld("hello").then(console.log);

/* greyscale */
const greyscale = WorkerPromise(imgData => {
  for (let i = 0; i < imgData.length; i += 4) {
    const v = 0.34 * imgData[i] + 0.5 * imgData[i + 1] + 0.16 * imgData[i + 2];
    imgData[i] = imgData[i + 1] = imgData[i + 2] = v;
  }

  return imgData;
});

img.onload = ({ target }) => {
  const { width, height } = target;
  const ctx = Object.assign(canvas, { width, height }).getContext("2d");
  ctx.drawImage(target, 0, 0);
  const imgData = ctx.getImageData(0, 0, width, height).data;
  greyscale(imgData).then(v =>
    ctx.putImageData(new ImageData(v, width, height), 0, 0)
  );
};

/* ArrayBuffer */
new ArrayBuffer(12); // WebGL에서 데이터 압축을 위해 탄생, 12바이트 메모리 공간 원본 데이터

const intView = new Int32Array(new ArrayBuffer(12)); // 원본 데이터를 안고 태어남, 4바이트씩 묶어서 바라봄
intView[0] = 10;
intView[1] = 20;
intView[2] = 30;
// 0 0 0 10 0 0 0 20 0 0 0 30

const utiny = new Uint8ClampedArray(new ArrayBuffer(12));
utiny[0] = 10;
utiny[1] = 20;
utiny[2] = 30;
// 10 20 30 0 0 0 0 0 0 0 0 0

const buffer = new ArrayBuffer(12);
const intView = new Int32Array(buffer);
intView[0] = 10;
intView[1] = 20;
intView[2] = 30;
const utiny = new Uint8ClampedArray(buffer);
utiny[0] = 10;
utiny[1] = 20;
utiny[2] = 30;
// buffer: 10 20 30 10 0 0 0 20 0 0 0 30 충돌이 일어나지 않음

/* SharedArrayBuffer: 거대한 데이터를 복사해가며 넘기지 않기 때문에 빠름, 동시성 문제 */
const greyscale = WorkerPromise(sObj => {
  const v = new Uint8ClampedArray(sObj);
  for (let i = 0; i < v.byteLength; i += 4) {
    const j = 0.34 * v[i] + 0.5 * v[i + 1] + 0.16 * v[i + 2];
    v[i] = v[i + 1] = v[i + 2] = j;
  }
  return sObj;
});

img.onload = ({ target }) => {
  const { width, height } = target;
  const ctx = Object.assign(canvas, { width, height }).getContext("2d");
  ctx.drawImage(target, 0, 0);
  const sObj = new SharedArrayBuffer(width * height * 4);
  const u8c = new Uint8ClampedArray(sObj);
  const imgData = ctx.getImageData(0, 0, width, height).data;
  u8c.set(imgData);
  //   greyscale(sObj).then(__ => {
  //     const r = new Uint8ClampedArray(u8c.byteLength);
  //     r.set(u8c);
  //     ctx.putImageData(new ImageData(r, width, height), 0, 0);
  //   });
  greyscale(sObj)
    .then(__ => {
      copy();
      return brightness({ rate: -0.1, sObj });
    })
    .then(copy);
};

const brightness = WorkerPromise(({ rate, sObj }) => {
  const v = new Uint8ClampedArray(sObj);
  for (let i = 0; i < v.byteLength; i += 4) {
    v[i] = v[i] * (1 + rate);
    v[i + 1] = v[i + 1] * (1 + rate);
    v[i + 2] = v[i + 2] * (1 + rate);
  }
  return sObj;
});

/* Schedule Queue */
// 잘못된 점 하나 고칠 것
const WorkerPromise = f => {
  let resolve;
  let reject;
  let start;
  let end;
  const worker = Object.assign(
    new Worker(
      URL.createObjectURL(
        new Blob([`onmessage = e => postMessage((${f})(e.data));`], mine.js)
      )
    ),
    {
      onmessage: e => (resolve(e.data), next()),
      onerror: e => (reject(e.data), next())
    }
  );

  const next = () => {
    if (!start.next) return;
    ({ data, resolve, reject } = start.next);
    start = start.next;
    worker.postMessage(data);
  };

  return data =>
    new Promise((res, rej) => {
      const v = { data, resolve: res, reject: rej };
      if (end) {
        end = end.next = v;
      } else {
        start = end = v;
        resolve = res;
        reject = rej;
        worker.postMessage(data);
      }
    });
};

greyscale(sObj).then(copy);
let i = 10;
while (i--) brightness({ rate: -0.1, sObj }).then(copy);
