import React, { useState } from "./node_modules/react";

const EventPractice = () => {
  const [form, setForm] = useState({
    username: "",
    message: ""
  });
  const { username, message } = form;

  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  const onClick = () => {
    setForm({
      username: "",
      message: ""
    });
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="사용자명"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
