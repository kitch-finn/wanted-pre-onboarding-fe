import React from 'react';
import axios from 'axios';

function Login() {
  const handleLogin = () => {
    axios
      .post(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin`,
        {
          email: `example@example.com`,
          password: `12345678`,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        localStorage.setItem('user', res.data.access_token);
        console.log(localStorage);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div>
        <div>
          페이지 안에 이메일 입력창, 비밀번호 입력창, 제출 버튼이 포함된 형태로
          구성해주세요 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다.
        </div>
        <div>
          Email
          <input />
        </div>
        <div>
          Password
          <input />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}

export default Login;
