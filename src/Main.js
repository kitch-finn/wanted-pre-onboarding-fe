import React, { useState } from 'react';
import {
  passwordValidator,
  passwordMatchValidator,
  emailValidator,
} from './utils/Validator';

import styled from 'styled-components';
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
    } else {
      setEmailErr(false);
    }
  };

  const checkPassword = () => {
    if (!passwordValidator(info.password)) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  };

  const checkMatchPassword = () => {
    if (!passwordMatchValidator(info.password, info.passwordCheck)) {
      setPasswordCheckErr(true);
    } else {
      setPasswordCheckErr(false);
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
        window.location.replace('/');
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
        {emailErr ? <div>이메일 형식에 맞게 입력해주세요.</div> : null}
      </div>
      <div>
        비밀번호
        <input
          onChange={handleInputValue('password')}
          placeholder='8자 이상의 영문, 숫자를 입력해주세요.'
        />
        {passwordErr ? (
          <div>비밀번호는 8자 이상의 영문, 숫자가 포함되어야 합니다.</div>
        ) : null}
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
          {passwordCheckErr ? <div>비밀번호가 다릅니다.</div> : null}
        </>
      ) : null}
      {signupMode ? (
        <div>
          <span>이미 회원이신가요?</span>
          <button onClick={() => setSignupMode(false)}>로그인 하러 가기</button>
        </div>
      ) : (
        <div>
          <span>회원이 아니라면?</span>
          <button onClick={() => setSignupMode(true)}>
            회원가입 하러 가기
          </button>
        </div>
      )}
    </>
  );
}

export default Main;
