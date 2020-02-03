import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const SomeComponent = props => <p>{props.content}</p>;
const Article = props => (
  <div className="something">
    {props.children}
    <p style={{ fontSize: "30px" }}>{props.text}</p>
  </div>
);

function App() {
  const articleText = "Who are you?";
  const childText = "I am something else";

  return (
    <Article text={articleText}>
      <SomeComponent content={childText} />
    </Article>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
