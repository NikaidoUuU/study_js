import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

import ProductList from "./ProductList";
import Checkout from "./Checkout";

function App() {
  const [showProductList, setShowProductList] = useState(true);
  const [cart, setCart] = useState([]);

  function addToCart(productId, name, price, quantity) {
    const hasItem = !!cart.filter(product => product.id === productId).length;

    if (hasItem) {
      const newCart = cart.map(product => {
        return product.id === productId ? { ...product, quantity } : product;
      });

      setCart(newCart);
    } else {
      const newCart = cart.concat([{ id: productId, quantity, name, price }]);
      setCart(newCart);
    }
  }

  return (
    <div>
      <header>
        <button onClick={() => setShowProductList(true)}>상품목록</button>
        <button onClick={() => setShowProductList(false)}>
          장바구니 {cart.length ? `(${cart.length})` : ""}
        </button>
      </header>
      <main>
        {showProductList && <ProductList addToCart={addToCart} />}
        {!showProductList && <Checkout />}
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
