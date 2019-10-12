/* 조건부 객체 속성 */
const getUser = emailIncluded => {
  return {
    name: "John",
    surname: "Doe",
    ...(emailIncluded && { email: "john@doe.com" })
  };
};

const user = getUser(true);
console.log(user); // { name: "John", surname: "Doe", email: "john@doe.com" }
/* ----------------------------------------------------------------------------- */

function lotate(M, clock = true) {
  const arr = [...Array(M.length)].map(() => Array(M[0].length).fill());
  for (let col = 0; col < M.length; col++) {
    for (let row = 0; row < M[0].length; row++) {
      if (clock) {
        arr[col][row] = M[M.length - row - 1][col];
      } else {
        arr[col][row] = M[row][M.length - col - 1];
      }
    }
  }
  return arr;
}

function getChange(money) {
  const wallet = [10000, 5000, 1000, 500, 100, 50, 10];
  const counts = [];
  let won = Math.floor(money / 10) * 10;

  wallet.forEach((value, index) => {
    if (won >= value) {
      let count = Math.floor(won / value);
      won -= value * count;
      counts[index] = count;
    } else if (won === value) {
      for (let i = 0; i < wallet.length - index; i++) {
        counts.push(0);
      }
    } else {
      counts[index] = 0;
    }
  });

  wallet.map((value, index) =>
    console.log(`${value.toLocaleString()}원: ${counts[index]}개`)
  );
}
