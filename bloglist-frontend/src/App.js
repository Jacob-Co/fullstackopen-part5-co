import React, { useState, useEffect } from 'react';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import CreateBlog from './components/CreateBlog';

// Server Request Helpers
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const localStorageKey = 'localBloggAppUser';

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const localToken = window.localStorage.getItem(localStorageKey);
    if (localToken) {
      const transformedToken = JSON.parse(localToken);
      setUser(transformedToken);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await loginService.login({ username, password });
      window.localStorage.setItem(localStorageKey, JSON.stringify(token));
      setUser(token);
      setUsername('');
      setPassword('');
    } catch (e) {
      alert('Invalid username of password');
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(localStorageKey);
    window.location.reload();
    setUser('');
  };

  const addBlog = (event) => {
    event.preventDefault();
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
        <button onClick={handleLogout}>logout</button>
        
        <CreateBlog
          addBlog={addBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
        <BlogList blogs={blogs}/>
        </div>
    }
    </>
  )
}

export default App