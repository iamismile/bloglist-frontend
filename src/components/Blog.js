import React, { useState } from 'react';

function Blog({ blog, addLike }) {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const buttonText = visible ? 'Hide' : 'View';

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
      </div>
    </div>
  );
}

export default Blog;
