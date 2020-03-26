import React from 'react';

const Counter = ({ number, onIncrease, onDecrease }) => (
  <div>
    <h1>{number}</h1>
    <div>
      <button type="button" onClick={onIncrease}>+1</button>
      <button type="button" onClick={onDecrease}>-1</button>
    </div>
  </div>
);

export default Counter;
