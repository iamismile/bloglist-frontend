import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blog';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    error: null,
    success: null,
  });

  const blogFormRef = useRef();

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    getAllBlogs();
  }, []);

  useEffect(() => {
    const userString = window.localStorage.getItem('loggedUser');
    if (userString) {
      const parsedUser = JSON.parse(userString);
      blogService.setToken(parsedUser.token);
      setUser(parsedUser);
    }
  }, []);

  const getLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setNotification({ ...notification, error: 'Wrong Credentials' });
      setTimeout(() => {
        setNotification({ error: null, success: null });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);

      setNotification({
        ...notification,
        success: `A new blog "${newBlog.title}" by ${newBlog.author} added`,
      });
      setTimeout(() => {
        setNotification({ error: null, success: null });
      }, 5000);

      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
    } catch (error) {
      setNotification({
        ...notification,
        error: error.message,
      });
      setTimeout(() => {
        setNotification({ error: null, success: null });
      }, 5000);
    }
  };

  const addLike = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject);
    setBlogs(
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    );
  };

  // Sort blog posts by the number of likes
  const sortedBlogs = blogs.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1;
    }

    if (a.likes > b.likes) {
      return -1;
    }

    return 0;
  });

  if (user === null) {
    return (
      <div>
        <h2>Login to Application</h2>

        <Notification message={notification} />

        <LoginForm getLogin={getLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={notification} />

      <p>
        {user.name} is logged-in <button onClick={handleLogout}>Logout</button>
      </p>

      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <h2>Create New</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      ))}
    </div>
  );
}

export default App;
