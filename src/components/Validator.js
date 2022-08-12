module.exports = {
  passwordValidator: (password) => {
    // 8자 이상의 영문, 숫자 조합
    const regExp = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
    return regExp.test(password);
  },

  passwordMatchValidator: (password, retypePassword) => {
    if (password === '' || retypePassword === '') return false;
    return password === retypePassword;
  },
  emailValidator: (email) => {
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExp.test(email);
  },
};
