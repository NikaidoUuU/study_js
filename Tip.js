/* 피라미드, 마름모꼴 찍기 */
for (let star = 1; star <= 5; star += 2) {
  console.log(" ".repeat((5 - star) / 2) + "*".repeat(star));
}

for (let star = -4; start < 5; star += 2) {
  console.log(" ".repeat(Math.abs(star) / 2) + "*".repeat(5 - Math.abs(star)));
}
/* ----------------------------------------------------------------------------- */

/* 유일 값 배열 구하기 */
const cars = ["Mazda", "Ford", "Renault", "Opel", "Mazda"];

const uniqueWithSpreadOperator = [...new Set(cars)];
console.log(uniqueWithSpreadOperator); // ["Mazda", "Ford", "Renault", "Opel"]

import * as _ from "lodash";
const uniqCars = _.uniq(cars);
console.log(uniqCars);
/* ----------------------------------------------------------------------------- */

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
