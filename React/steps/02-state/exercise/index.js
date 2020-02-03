import React from "react";
import ReactDOM from "react-dom";
import CheckoutForm from "./CheckoutForm";
import "./styles.scss";

const App = () => (
  <div>
    <h1>02 State</h1>
    <p>State를 알아볼까요?</p>
    <div>
      <CheckoutForm />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
