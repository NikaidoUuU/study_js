import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
};

const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  const { value } = state;

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

// useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고,
// 두 번째 파라미터에는 해당 리듀서의 기본 값을 넣어 줍니다.
// 이 Hook을 사용하면 state 값과 dispatch 함수를 받아 오는데요.
// 여기서 state는 현재 가리키고 있는 상태고, dispatch는 액션을 발생시키는 함수입니다.
// dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조입니다.

export default CounterReducer;
