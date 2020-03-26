import React from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
import Counter from '../components/Counter';

const CounterContainer = ({ number, onIncrease, onDecrease }) => (
  <Counter
    number={number}
    onIncrease={onIncrease}
    onDecrease={onDecrease}
  />
);

export default connect(
  ({ counter }) => ({
    number: counter
  }),
  {
    onIncrease: increase,
    onDecrease: decrease
  }
)(CounterContainer);
