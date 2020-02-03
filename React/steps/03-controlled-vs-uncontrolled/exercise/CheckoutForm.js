import React, { useState, useReducer } from "react";
import "./styles.scss";

const reducer = (state, action) => {
  const SHIPPING_USERNAME = state["shipping-username"];
  const SHIPPING_ADDRESS = state["shipping-address"];

  switch (action.type) {
    case "CHECKED":
      return {
        ...state,
        "billing-username": SHIPPING_USERNAME,
        "billing-address": SHIPPING_ADDRESS
      };
    case "UNCHECKED":
      return {
        ...state,
        "billing-username": "",
        "billing-address": ""
      };
    default:
      return {
        ...state,
        [action.name]: action.value
      };
  }
};

export default function CheckoutForm({ onSubmit }) {
  const [state, dispatch] = useReducer(reducer, {
    "shipping-username": "",
    "shipping-address": "",
    "billing-username": "",
    "billing-address": ""
  });
  const [checked, setChecked] = useState(false);

  const SHIPPING_USERNAME = state["shipping-username"];
  const SHIPPING_ADDRESS = state["shipping-address"];
  const BILLING_USERNAME = state["billing-username"];
  const BILLING_ADDRESS = state["billing-address"];

  const onChange = e => {
    dispatch(e.target);
  };

  const onClick = () => {
    if (checked) {
      dispatch({ type: "UNCHECKED" });
    } else {
      dispatch({ type: "CHECKED" });
    }

    setChecked(!checked);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h3>배송 정보</h3>

      <div>
        <label htmlFor="shipping-username">이름</label>
        <input
          id="shipping-username"
          type="text"
          name="shipping-username"
          autoComplete="off"
          value={SHIPPING_USERNAME}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="shipping-address">주소</label>
        <input
          id="shipping-address"
          type="text"
          name="shipping-address"
          value={SHIPPING_ADDRESS}
          onChange={onChange}
        />
      </div>

      <hr />

      <label>
        <input type="checkbox" onClick={onClick} defaultChecked={checked} />{" "}
        배송 정보와 동일
      </label>

      <h3>결제 정보</h3>

      <div>
        <div>
          <label htmlFor="billing-username">이름</label>
          <input
            id="billing-username"
            type="text"
            name="billing-username"
            autoComplete="off"
            value={BILLING_USERNAME}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="billing-address">주소</label>
          <input
            id="billing-address"
            type="text"
            name="billing-address"
            autoComplete="off"
            value={BILLING_ADDRESS}
            onChange={onChange}
          />
        </div>
      </div>

      <button type="submit">완료</button>
    </form>
  );
}
