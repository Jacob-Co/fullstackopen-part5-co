import React from 'react';
import Blog from './Blog.js';

const BlogList = ({blogs, addLike}) => (
<div>
<h2>blogs</h2>
{blogs.map(blog =>
  <Blog key={blog.id} blog={blog} addLike={addLike}/>
)}
</div>
)

export default BlogList;
