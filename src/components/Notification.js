import React from 'react';

function Notification({ message }) {
  const { error } = message;
  const { success } = message;

  if (error === null && success) {
    return <div className="success">{success}</div>;
  }

  if (success === null && error) {
    return <div className="error">{error}</div>;
  }

  return null;
}

export default Notification;
