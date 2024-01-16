// components/Login.js
import React, { useState } from 'react';

const Login = ({ setIsAdmin }) => {
  const handleLogin = () => {
    const username = 'admin';
    const password = 'admin123';

    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
    } else {
      alert('Błędne dane logowania');
    }
  };

  return (
    <div>
      <h1>Panel logowania</h1>
      <button onClick={handleLogin}>Zaloguj</button>
    </div>
  );
};

export default Login;
