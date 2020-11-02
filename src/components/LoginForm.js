import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ getLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = { username, password };
    getLogin(credentials);
    setUsername('');
    setPassword('');
  };

  return (
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
  );
}

LoginForm.propTypes = {
  getLogin: PropTypes.func.isRequired,
};

export default LoginForm;
