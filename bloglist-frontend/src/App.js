import React, { useState, useEffect } from 'react';

import BlogList from './components/BlogList';
import Login from './components/Login';

import blogService from './services/blogs';

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

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password);
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
      : <BlogList blogs={blogs}/>
    }
    </>
  )
}

export default App