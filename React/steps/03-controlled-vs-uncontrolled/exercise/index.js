import React from "react";
import ReactDOM from "react-dom";
import CheckoutForm from "./CheckoutForm";
import "./styles.scss";

const onSubmit = state => {
  console.log(state);
};

const App = () => (
  <div>
    <h1>03 Controlled Component vs Uncontrolled Component</h1>
    <div>
      <CheckoutForm onSubmit={onSubmit} />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
