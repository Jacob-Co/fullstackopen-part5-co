import React from 'react';

const CreateBlog = ({handleSubmit, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => (
  <div>
    <h2>Create New</h2>
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({target}) => handleTitleChange(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({target}) => handleAuthorChange(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({target}) => handleUrlChange(target.value)}
        />
    </div>
    <button>Create</button>
  </form>
  </div>
);

export default CreateBlog;
