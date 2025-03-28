import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import '../assets/fonts/css/fontello.css'

const Login = () => {
  const [authState, setAuthState] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleAuth = async (event)=> {
    event.preventDefault();
    if(email === '' || password === '') {
      setAuthState(1);
      return;
    }
  
    console.log({email, password});
  
    try {
      const result = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password
      });
      
      localStorage.setItem('token', result.data.token);
      window.location.href = '/board';
    } catch(err) {
      if(err.response.status === 401) {
        setAuthState(2);
        return;
      } else {
        setAuthState(3);
      }
    }
  }

  return (
    <div className="login-content">
      <div className="form-container">
        <h2>Login</h2>
            {(() => {
              switch(authState) {
                case 0:
                  return;
                case 1:
                  return (
                    <div className="error-container">
                      <p className="error-msg">Please fill in all the fields</p>
                    </div>
                  );
                case 2:
                  return (
                    <div className="error-container">
                      <p className="error-msg">Login failed: wrong e-mail or password</p>
                    </div>
                  );
                case 3:
                  return (
                    <div className="error-container">
                      <p className="error-msg">An erorr occured. Please try again later</p>
                    </div>
                  );
                case 4:
                  return (
                    <div className="success-container">
                      <p className="success-msg">Account has been created. You can now log in</p>
                    </div>
                  );
              }
            })()}
          
        <form> 
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="E-mail" onChange={handleEmailChange}/>
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Password" onChange={handlePasswordChange}/>
          </div>
          <div className="form-submit">
            <a href='/register' className="button-password-reset">Sign up</a>
            <button type="submit" className="button-submit icon-right" onClick={handleAuth}></button>
          </div>
      </form>
      </div>
    </div>
  );
}

export default Login;