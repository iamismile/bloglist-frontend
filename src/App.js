import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blog';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      setUser(parsedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const blogObject = {
        title,
        author,
        url,
      };

      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to Application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>

      <p>
        {user.name} is logged-in <button onClick={handleLogout}>Logout</button>
      </p>

      <div>
        <h2>Create New</h2>
        <form onSubmit={addBlog}>
          <div>
            title{' '}
            <input
              type="text"
              name="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author{' '}
            <input
              type="text"
              name="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url{' '}
            <input
              type="text"
              name="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
