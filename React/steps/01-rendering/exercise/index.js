import React from "react";
import ReactDOM from "react-dom";

const people = [
  { id: 1, name: "Ken Huh", age: 37, gender: "m", occupation: "틀딱" },
  { id: 2, name: "Jason Bourne", age: null, gender: "m", occupation: "spy" },
  { id: 3, name: "Iron Man", age: 45, gender: "m", occupation: "super hero" }
];

const Profile = ({ id, name, age, gender, occupation }) => {
  return (
    <div className={`profile-${id}`}>
      <p>{name}</p>
      <p>{age}</p>
      <p>{gender === "m" ? "male" : "female"}</p>
      <p>{occupation}</p>
    </div>
  );
};

const peopleList = people.map(person => (
  <Profile key={person.id} {...person} />
));

const App = () => {
  return (
    <div>
      <h1>01 Rendering</h1>
      {peopleList}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
