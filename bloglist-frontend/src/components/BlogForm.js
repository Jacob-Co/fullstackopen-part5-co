import React, { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submitNewBlog = async (event) => {
    event.preventDefault();
    const response = await addBlog({ title, author, url });
    if (response) {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={submitNewBlog}>
        <div>
        title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
