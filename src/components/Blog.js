import React, { useState } from 'react';

function Blog({ blog, addLike, removeBlog, user }) {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const buttonText = visible ? 'Hide' : 'View';
  const hideRemoveButton = user.username !== blog.user.username ? 'none' : '';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = (blogObject) => {
    const { id, title, author, url, likes } = blogObject;
    const newBlog = {
      title,
      author,
      url,
      likes: likes + 1,
    };

    addLike(id, newBlog);
  };

  const handleRemove = () => {
    console.log('Removing blog');
    removeBlog();
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'tomato',
    border: '2px solid black',
    borderRadius: 4,
    outline: 'none',
    display: hideRemoveButton,
  };

  return (
    <div style={blogStyle}>
      <h4>
        {blog.title} <button onClick={toggleVisibility}>{buttonText}</button>
      </h4>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          Likes {blog.likes}{' '}
          <button onClick={() => handleLikes(blog)}>like</button>
        </p>
        <p>{blog.author}</p>
        <button style={removeButtonStyle} onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default Blog;
