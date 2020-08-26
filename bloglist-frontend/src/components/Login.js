import React from 'react';

const Login = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => (
  <div>
    <h2>Log in to Application</h2>
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => handleUsernameChange(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => handlePasswordChange(target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  </div>
);

export default Login;
