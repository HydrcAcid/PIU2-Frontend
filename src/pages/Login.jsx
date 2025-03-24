import React from 'react';
import '../assets/fonts/css/fontello.css'

function Login() {
  return (
    <div className="login-content">
      <div className="form-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="E-mail"/>
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Password"/>
          </div>
          <div className="form-submit">
            <a className="button-password-reset">Forgot your password?</a>
            <button type="submit" className="button-submit icon-right"></button>
          </div>
      </form>
      </div>
    </div>
  );
}

export default Login;