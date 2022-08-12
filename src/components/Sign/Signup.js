import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignup = () => {
    axios
      .post(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup`,
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        alert('회원가입에 성공했습니다.');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <button onClick={handleSignup}>Signup</button>
    </>
  );
}

export default Signup;
