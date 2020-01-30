// https://ko.reactjs.org/docs/components-and-props.html#extracting-components

function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "https://placekitten.com/g/64/64"
  }
};

ReactDOM.render(
  <Comment date={comment.date} text={comment.text} author={comment.author} />,
  document.getElementById("root")
);

// https://ko.reactjs.org/docs/state-and-lifecycle.html

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));

// https://ko.reactjs.org/docs/handling-events.html

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        {isLoggedIn ? (
          <LogoutButton onClick={this.handleLogoutClick} />
        ) : (
          <LoginButton onClick={this.handleLoginClick} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<LoginControl />, document.getElementById("root"));

// https://ko.reactjs.org/docs/lifting-state-up.html

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return "";

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) return <p>The water would boil.</p>;

  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = e => {
    this.props.onTemperatureChange(e.target.value);
  };

  render() {
    const { temperature, scale } = this.props;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange = temperature => {
    this.setState({ scale: "c", temperature });
  };

  handleFahrenheitChange = temperature => {
    this.setState({ scale: "f", temperature });
  };

  render() {
    const { scale, temperature } = this.state;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />

        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

// https://ko.reactjs.org/docs/composition-vs-inheritance.html#specialization

function FancyBorder({ color, children }) {
  return <div className={"FancyBorder FancyBorder-" + color}>{children}</div>;
}

function Dialog({ title, message, children }) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{title}</h1>
      <p className="Dialog-message">{message}</p>
      {children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "" };
  }

  handleChange = e => {
    this.setState({ login: e.target.value });
  };

  handleSignUp = () => {
    alert(`Welcome aboard, ${this.state.login}!`);
  };

  render() {
    return (
      <Dialog
        title="Mars Exploration Program"
        message="How should we refer to you?"
      >
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>Sign Me Up!</button>
      </Dialog>
    );
  }
}

ReactDOM.render(<SignUpDialog />, document.getElementById("root"));

// https://ko.reactjs.org/docs/render-props.html

class Cat extends React.Component {
  render() {
    const { mouse } = this.props;

    return (
      <img
        src="/cat.jpg"
        style={{ position: "absolute", left: mouse.x, top: mouse.y }}
      />
    );
  }
}

class Mouse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: "100%" }} onMouseMove={this.handleMouseMove}>
        {/*
            <Mouse>가 무엇을 렌더링하는지에 대해 명확히 코드로 표기하는 대신,
            `render` prop을 사용하여 무엇을 렌더링할지 동적으로 결정할 수 있습니다.
          */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  // `this.renderTheCat`를 항상 생성하는 메서드를 정의합니다.
  // 이것은 render를 사용할 때 마다 *같은* 함수를 참조합니다.
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}

// 위 예제에서는 render를 사용했지만, 우리는 children prop을 더 쉽게 사용할 수 있습니다.

// <Mouse children={mouse => (
//   <p>The mouse position is {mouse.x}, {mouse.y}</p>
// )}/>

// 이 테크닉은 자주 사용되지 않기 때문에, API를 디자인할 때
// children은 함수 타입을 가지도록 propTypes를 지정하는 것이 좋습니다.

// Mouse.propTypes = {
//   children: PropTypes.func.isRequired
// };
