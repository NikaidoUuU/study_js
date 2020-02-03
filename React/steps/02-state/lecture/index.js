import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const item = {
  name: "번데기 샴푸",
  price: 7500
};

export default function ShoppingItem(props) {
  const { name, price } = props.item;
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  function changeQuantity(qty) {
    if (quantity + qty <= -1) {
      setError("수량은 0 이상이어야 합니다.");
      return;
    }

    setError(null);
    setQuantity(quantity + qty);
  }

  return (
    <div>
      <h3>{name}</h3>
      <h4>{price}원</h4>
      <div>
        <div onClick={() => changeQuantity(-1)}>-</div>
        <div>{quantity}</div>
        <div onClick={() => changeQuantity(1)}>+</div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

ReactDOM.render(<ShoppingItem item={item} />, document.getElementById("root"));
