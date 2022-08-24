import React, { useState } from 'react';
import {
  passwordValidator,
  passwordMatchValidator,
  emailValidator,
} from './utils/Validator';

import styled from 'styled-components';
import axios from 'axios';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 80);
  overflow: hidden;
  vertical-align: middle;
`;

export const H1 = styled.h1`
  text-decoration: underline overline black;
`;

export const H2 = styled.h1`
  text-decoration: black wavy underline; ;
`;
export const LoginText = styled.div`
  display: flex;
  font-size: 20px;
  margin: 5%;
  align-items: center;
  flex-direction: column;
`;

export const ModeSpan = styled.span`
  margin-left: 1%;
  color: gray;
  cursor: pointer;
  text-decoration: underline;
`;

export const ModeDiv = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const BigInput = styled.input`
  width: 30vw;
  height: 5vh;
  font-size: 15px;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: lightgray;
  box-shadow: none;
  transition: 0.25s;
  border: 1px solid white;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
  &:hover {
    border: 1px solid gray;
  }
  &::placeholder {
    color: white;
  }
`;

export const Button = styled.button`
  position: relative;
  border: none;
  padding: 15px 30px;
  border-radius: 15px;
  margin: 2%;
  font-family: sans-serif;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: gray;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

export const ErrMsg = styled.div`
  color: gray;
  text-decoration: underline;
  align-items: center;
`;

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
        window.location.replace('/todo');
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div>
        <MainContainer>
          <H1>"The Best Todos Ever"</H1>
          <div>fin@fin.com / finfin12</div>
          {signupMode ? <H2>회원가입</H2> : <H2>로그인</H2>}

          <div>
            <LoginText>이메일</LoginText>
            <BigInput
              type='email'
              onChange={handleInputValue('email')}
              placeholder='example@example.com'
            />
            {emailErr ? (
              <ErrMsg>이메일 형식에 맞게 입력해주세요.</ErrMsg>
            ) : null}
          </div>

          <div>
            <LoginText>비밀번호</LoginText>
            <BigInput
              onChange={handleInputValue('password')}
              placeholder='8자 이상의 영문, 숫자를 입력해주세요.'
              type='password'
            />
            {passwordErr ? (
              <ErrMsg>
                비밀번호는 8자 이상의 영문, 숫자가 포함되어야 합니다.
              </ErrMsg>
            ) : null}
          </div>
          {signupMode ? null : (
            <Button onClick={handleLogin} type='button'>
              Login
            </Button>
          )}

          {signupMode ? (
            <>
              <div>
                <LoginText>비밀번호 확인</LoginText>
                <BigInput
                  onChange={handleInputValue('passwordCheck')}
                  placeholder='비밀번호를 다시 입력해주세요.'
                  type='password'
                />
                {passwordCheckErr ? (
                  <ErrMsg>비밀번호가 다릅니다.</ErrMsg>
                ) : null}
              </div>
              <Button onClick={handleSignup} type='button'>
                Signup
              </Button>
            </>
          ) : null}
          {signupMode ? (
            <ModeDiv>
              <span>이미 회원이신가요?</span>
              <ModeSpan onClick={() => setSignupMode(false)}>
                로그인 하러 가기
              </ModeSpan>
            </ModeDiv>
          ) : (
            <ModeDiv>
              <span>회원이 아니라면?</span>
              <ModeSpan onClick={() => setSignupMode(true)}>
                회원가입 하러 가기
              </ModeSpan>
            </ModeDiv>
          )}
        </MainContainer>
      </div>
    </>
  );
}

export default Main;
