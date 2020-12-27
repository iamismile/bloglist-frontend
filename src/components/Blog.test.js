import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const addLike = jest.fn();
  const removeBlog = jest.fn();

  beforeEach(() => {
    const blog = {
      id: '5',
      title: 'Testing blog title is renderd or not',
      author: 'Anonymous Author',
      likes: 20,
      url: 'https://www.anonymous-author.com/blogs',
      user: {
        username: 'anonymous',
      },
    };

    const user = {
      username: 'anonymous',
    };

    component = render(
      <Blog blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
    );
  });

  test('Renders blog title but not display other info', () => {
    const h4 = component.container.querySelector('h4');
    const blogInfo = component.container.querySelector('.blogInfo');

    // component.debug();

    expect(h4).toHaveTextContent('Testing blog title is renderd or not');
    expect(blogInfo).toHaveStyle('display:none');
  });

  test('Display blogs urls and likes on button click', () => {
    const toggleVisibilityBtn = component.container.querySelector(
      '.toggleVisibilityBtn'
    );
    fireEvent.click(toggleVisibilityBtn);

    const blogInfo = component.container.querySelector('.blogInfo');
    const url = component.container.querySelector('.url');
    const likes = component.container.querySelector('.likes');

    expect(blogInfo).toHaveStyle('display:block');
    expect(url).toHaveTextContent('https://www.anonymous-author.com/blogs');
    expect(likes).toHaveTextContent('Likes 20');
  });

  test('Clicking the like button twice calls event handler twice', () => {
    const likeBtn = component.container.querySelector('.likes button');
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);

    // console.log(addLike.mock.calls);

    expect(addLike.mock.calls).toHaveLength(2);
  });
});
