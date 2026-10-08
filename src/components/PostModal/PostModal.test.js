import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostModal from './PostModal';


const mockPost = {
  id: '1',
  title: 'Test Reddit Post',
  body: 'This is a test post.',
  author: 'testUser',
  votes: 100,
  comments: 2,
  subreddit: 'reactjs',
  image: null,
  commentData: [
    {
      id: 'comment1',
      author: 'commentUser',
      body: 'This is a test comment.',
    },
  ],
};

test('renders the selected post details', () => {
  render(
    <PostModal post={mockPost} closeModal={() => {}}/>
  );
  expect(screen.getByText('Test Reddit Post')).toBeInTheDocument();
  expect(screen.getByText('This is a test post.')).toBeInTheDocument();
  expect(screen.getByText('Posted by testUser')).toBeInTheDocument();
});

test('calls closeModal when the close button is clicked', async () => {
  const user = userEvent.setup();
  const mockCloseModal = jest.fn();
  render(<PostModal post={mockPost} closeModal={mockCloseModal}/>);
  const closeButton = screen.getByRole('button', {name: '✕',});
  await user.click(closeButton);
  expect(mockCloseModal).toHaveBeenCalled();
});

test('shows comments when the comments button is clicked', async () => {
  const user = userEvent.setup();

  render(
    <PostModal post={mockPost} closeModal={() => {}}/>);
  // The comment should not be visible before clicking
  expect(screen.queryByText('This is a test comment.')).not.toBeInTheDocument();
  // Click the comments button
  const commentsButton = screen.getByRole('button', {name: /2 comments/i,});
  await user.click(commentsButton);
  // The comment should now be visible
  expect(screen.getByText('This is a test comment.')).toBeInTheDocument();
});