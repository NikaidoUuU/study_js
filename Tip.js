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

/* optional chaining, @babel/plugin-proposal-optional-chaining 필요함 */
let data;
if (
  myObj &&
  myObj.firstProp &&
  myObj.firstProp.secondProp &&
  myObj.firstProp.secondProp.actualData
)
  data = myObj.firstProp.secondProp.actualData;

const data = myObj?.firstProp?.secondProp?.actualData;
/* ----------------------------------------------------------------------------- */
