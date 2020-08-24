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
    const localUser = window.localStorage.getItem(localStorageKey);
    if (localUser) {
      const transformedUser = JSON.parse(localUser);
      setUser(transformedUser);
      blogService.setToken(transformedUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await loginService.login({ username, password });
      window.localStorage.setItem(localStorageKey, JSON.stringify(loginUser));
      setUser(loginUser);
      blogService.setToken(loginUser.token);
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

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.postBlog({title, author, url});
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(returnedBlog));
    } catch (e) {
      alert('missing title, author or url');
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