import React from "react";

const Counter = ({ number, onIncrease, onDecrease }) => (
  <div>
    <h1>{number}</h1>
    <button onClick={onIncrease}>+1</button>
    <button onClick={onDecrease}>-1</button>
  </div>
);

export default Counter;