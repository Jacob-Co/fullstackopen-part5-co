import React from 'react';
import Blog from './Blog.js';

const BlogList = ({blogs}) => (
<div>
<h2>blogs</h2>
{blogs.map(blog =>
  <Blog key={blog.id} blog={blog} />
)}
</div>
)

export default BlogList;
