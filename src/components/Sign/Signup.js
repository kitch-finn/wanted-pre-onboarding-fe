import React, { useState } from 'react';
import {
  passwordValidator,
  passwordMatchValidator,
  emailValidator,
} from '../../utils/Validator';
import axios from 'axios';

function Signup() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });

  const handleInputValue = (key) => (e) => {
    setInfo({ ...info, [key]: e.target.value });

    console.log(info);
  };

  const handleSignup = () => {
    axios
      .post(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup`,
        {
          ...info,
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
      <h1>회원가입</h1>
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
      <div>
        비밀번호 확인
        <input
          onChange={handleInputValue('password')}
          placeholder='비밀번호를 다시 입력해주세요.'
        />
      </div>

      <button onClick={handleSignup}>Signup</button>
    </>
  );
}

export default Signup;
