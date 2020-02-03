import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "VanillaCoding/api";

function SignupForm({ onSignup }) {
  const [useGitHub, setUseGitHub] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    const user = { username, name, password };
    onSignup(user);
  }

  useEffect(() => {
    if (useGitHub && username) {
      api.getGithubUser(username).then(({ name }) => {
        name ? setName(name) : setName("없자나");
      });
    }
  }, [useGitHub, username]);

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={useGitHub}
              onChange={() => setUseGitHub(!useGitHub)}
            />{" "}
            GitHub 계정 사용하기
          </label>
        </div>
        <hr />
        <div>
          <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder={useGitHub ? "GitHub 사용자이름" : "사용자이름"}
          />
        </div>
        <div>
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="보안이 좋지 않은 비밀번호 입력칸입니다."
          />
          <label>
            <input
              onChange={() => setShowPassword(!showPassword)}
              defaultChecked={showPassword}
              type="checkbox"
            />{" "}
            비밀번호 노출
          </label>
        </div>
        <div>
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            disabled={useGitHub}
          />
        </div>
        <footer>
          <button type="submit">회원가입</button>
        </footer>
      </form>
    </div>
  );
}

ReactDOM.render(
  <SignupForm onSignup={user => console.log(user)} />,
  document.getElementById("root")
);
