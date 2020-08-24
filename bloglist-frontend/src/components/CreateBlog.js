import React from 'react';

const CreateBlog = ({addBlog, title, setTitle, author, setAuthor, url, setUrl}) => (
  <div>
    <h2>Create New</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
    </div>
    <button>Create</button>
  </form>
  </div>
);

export default CreateBlog;
