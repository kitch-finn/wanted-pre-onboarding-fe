import React, { useState } from 'react';
import {
  passwordValidator,
  passwordMatchValidator,
  emailValidator,
} from './utils/Validator';

import axios from 'axios';

function Main() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [signupMode, setSignupMode] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordCheckErr, setPasswordCheckErr] = useState(false);

  const handleInputValue = (key) => (e) => {
    setInfo({ ...info, [key]: e.target.value });
    console.log(info);
  };

  const checkEmail = () => {
    if (!emailValidator(info.email)) {
      setEmailErr(true);
    }
  };

  const checkPassword = () => {
    if (!passwordValidator(info.password)) {
      setPasswordErr(true);
    }
  };

  const checkMatchPassword = () => {
    if (!passwordMatchValidator(info.password)) {
      setPasswordCheckErr(true);
      return true;
    }
  };

  const handleLogin = () => {
    checkEmail();
    checkPassword();
    if (emailErr === true || passwordErr === true) {
      return;
    }
    axios
      .post(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin`,
        {
          email: info.email,
          password: info.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        //! /todo로 이동
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignup = () => {
    checkEmail();
    checkPassword();
    checkMatchPassword();
    if (
      emailErr === true ||
      passwordErr === true ||
      passwordCheckErr === true
    ) {
      return;
    }
    axios
      .post(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup`,
        {
          email: info.email,
          password: info.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        console.log(res);
        alert('회원가입에 성공했습니다.');
        //! 메인 페이지로 이동
      });
    // .catch((err) => {
    //   console.error(err);
    // });
    // fin@fin.com / finfin12
  };

  return (
    <>
      <h1>"The Best Todos Ever"</h1>
      {signupMode ? <h2>회원가입</h2> : <h2>로그인</h2>}

      <div>
        이메일
        <input
          type='email'
          onChange={handleInputValue('email')}
          placeholder='example@example.com'
        />
      </div>
      <div>
        비밀번호
        <input
          onChange={handleInputValue('password')}
          placeholder='8자 이상의 영문, 숫자를 입력해주세요.'
        />
      </div>
      {signupMode ? null : (
        <button onClick={handleLogin} type='button'>
          Login
        </button>
      )}

      {signupMode ? (
        <>
          <div>
            비밀번호 확인
            <input
              onChange={handleInputValue('passwordCheck')}
              placeholder='비밀번호를 다시 입력해주세요.'
            />
          </div>
          <button onClick={handleSignup} type='button'>
            Signup
          </button>
        </>
      ) : null}
      <div>
        <span>회원이 아니라면?</span>
        <button onClick={() => setSignupMode(true)}>회원가입</button>
      </div>
    </>
  );
}

export default Main;
