import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../assets/fonts/css/fontello.css'

const Register = () => {
  const [authState, setAuthState] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);  
  }

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
      const result = await axios.post('http://localhost:3000/auth/register', {
        username: username,
        email: email,
        password: password
      });
      
      nav("/login");
    } catch(err) {
      if(err.response.status === 409) {
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
        <h2>Sign up</h2>
          <div className="error-container">
            {(() => {
              switch(authState) {
                case 0:
                  return;
                case 1:
                  return <p className="error-msg">Please fill in all the fields</p>;
                case 2:
                  return <p className="error-msg">Account with that e-mail already exists</p>;
                case 3:
                  return <p className="error-msg">Registration failed: try again later</p>;
              }
            })()}
          </div>
        <form> 
            <div className="form-group">
                <input type="text" id="username" name="username" placeholder="Username" onChange={handleUsernameChange}/>
            </div>
            <div className="form-group">
                <input type="email" id="email" name="email" placeholder="E-mail" onChange={handleEmailChange}/>
            </div>
            <div className="form-group">
                <input type="password" id="password" name="password" placeholder="Password" onChange={handlePasswordChange}/>
            </div>
            <div className="form-submit">
                <a className="button-password-reset"></a>
                <button type="submit" className="button-submit icon-right" onClick={handleAuth}></button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Register;