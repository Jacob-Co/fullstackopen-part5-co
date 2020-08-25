import React, { useState, useEffect } from 'react';

// Components
import BlogList from './components/BlogList';
import Login from './components/Login';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';

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
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

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

  const setNotification = (message, type) => {
    setMessage(message);
    setNotifType(type);
    setTimeout(() => setMessage(null), 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await loginService.login({ username, password });
      window.localStorage.setItem(localStorageKey, JSON.stringify(loginUser));
      setUser(loginUser);
      blogService.setToken(loginUser.token);
      setNotification('Successfully signed in', 'success');
    } catch (e) {
      setNotification('Invalid username or password', 'warning');
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    window.localStorage.removeItem(localStorageKey);
    window.location.reload();
    setUser('');
    setNotification('Successfully signed out', 'warning');
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.postBlog({title, author, url});
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(returnedBlog));
      setNotification(`Added new blog ${returnedBlog.title}`, 'success');
    } catch (e) {
      setNotification('Missing title, author or url', 'warning');
    }
  };

  return (
    <>
    <Notification message={message} type={notifType} />
    {
      user === null 
      ? <Login 
        handleSubmit={handleLogin} 
        username={username}
        handleUsernameChange={setUsername}
        password={password}
        handlePasswordChange={setPassword}
      />
      : <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        
        <CreateBlog
          handleSubmit={addBlog}
          title={title}
          handleTitleChange={setTitle}
          author={author}
          handleAuthorChange={setAuthor}
          url={url}
          handleUrlChange={setUrl}
        />
        <BlogList blogs={blogs}/>
        </div>
    }
    </>
  )
}

export default App