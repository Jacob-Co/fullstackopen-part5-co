import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggelVisibility = () => {
    setVisible(!visible);
  };

  const showIfVisible = {display: visible ? '' : 'none'};

  const handleLike = () => {
    const modifiedBlog = {...blog, likes: blog.likes + 1}
    addLike(modifiedBlog);
  };

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={toggelVisibility}>
      {visible ? 'hide' : 'view'}
    </button>
    <div style={showIfVisible}>
      <div>
        {blog.url}
      </div>
      <div>
        likes: {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
    </div>
  </div>
  )
};


export default Blog
