import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);

    const blog = {
      title: 'Testing blog form',
      author: 'Anonymous',
      url: 'https://unknown.com',
    };

    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(title, { target: { value: blog.title } });
    fireEvent.change(author, { target: { value: blog.author } });
    fireEvent.change(url, { target: { value: blog.url } });
    fireEvent.submit(form);

    // console.log(createBlog.mock.calls);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('Testing blog form');
  });
});
