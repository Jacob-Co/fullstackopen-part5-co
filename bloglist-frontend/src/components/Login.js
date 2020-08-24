import React from 'react';

const Login = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
  <h2>Log in to Application</h2>
  <form onSubmit={handleLogin}>
    <div>
      username
      <input 
        type="text"
        name="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
    <input
      type="password"
      name="Password"
      value={password}
      onChange={({ target }) => setPassword(target.value)}
    />
    </div>
    <button>Login</button>
  </form>
</div>
)

export default Login;
