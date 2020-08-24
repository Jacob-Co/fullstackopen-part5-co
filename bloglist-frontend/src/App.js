import React, { useState, useEffect } from 'react';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';

// Server Request Helpers
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await loginService.login({ username, password });
      setUser(token);
      setUsername('');
      setPassword('');
    } catch (e) {
      alert('Invalid username of password');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <>
    {
      user === null 
      ? <Login 
        handleLogin={handleLogin} 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      : <div>
        {user.name} logged in
        <button>logout</button>
        <BlogList blogs={blogs}/>
        </div>
    }
    </>
  )
}

export default App