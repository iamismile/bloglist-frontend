import React, { useState } from 'react';

function Blog({ blog }) {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const buttonText = visible ? 'Hide' : 'View';

  const toggleVisibility = () => {
    setVisible(!visible);
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
          Likes {blog.likes} <button>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  );
}

export default Blog;
