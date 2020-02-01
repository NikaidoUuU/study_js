import React, { Component } from "./node_modules/react";

class EventPracticeClass extends Component {
  state = {
    username: "",
    message: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleButtonClick = () => {
    this.setState({
      username: "",
      message: ""
    });
  };

  handleButtonKeyPress = e => {
    if (e.key === "Enter") {
      this.handleButtonClick();
    }
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="유저네임"
          value={this.state.username}
          onChange={this.handleInputChange}
          onKeyPress={this.handleButtonKeyPress}
        />
        <button onClick={this.handleButtonClick}>확인</button>
      </div>
    );
  }
}

export default EventPracticeClass;
