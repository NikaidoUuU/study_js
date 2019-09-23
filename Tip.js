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
