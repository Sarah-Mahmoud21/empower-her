import React, { useState } from 'react';
import '../stylePages/loginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { email, password });
  };

  return (
    <div className ="container">
    <form onSubmit={handleSubmit}>
      <div>
        <p className='login'>Login</p>
      </div>
      <div>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <>
      <button type="submit">Submit</button> 
      <p> Don't have an account <a href="/register">Sign up</a> </p>
      </>
    </form>
    </div>
  );
};

export default LoginForm;
