import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../features/posts/postsSlice';
import Post from './Post';
import userEvent from '@testing-library/user-event';

const createTestStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
  });
};

test('renders the post details', () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <Post
        id="1"
        title="Test Post"
        body="This is the post body."
        author="testUser"
        votes={100}
        comments={5}
        subreddit="reactjs"
        image={null}
        commentData={[]}
        onPostClick={() => {}}
      />
    </Provider>
  );

  expect(
    screen.getByText('Test Post')
  ).toBeInTheDocument();

  expect(
    screen.getByText('This is the post body.')
  ).toBeInTheDocument();

  expect(
    screen.getByText('Posted by testUser')
  ).toBeInTheDocument();

  expect(
    screen.getByText('100')
  ).toBeInTheDocument();
});



test('upvotes a post when the upvote button is clicked', async () => {
  const user = userEvent.setup();
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState: {
      posts: {
        posts: [
          {
            id: '1',
            title: 'Test Post',
            body: 'This is the post body.',
            author: 'testUser',
            votes: 100,
            comments: 5,
            subreddit: 'reactjs',
            image: null,
            commentData: [],
          },
        ],
        isLoading: false,
        hasError: false,
      },
    },
  });

  render(
    <Provider store={store}>
      <Post
        id="1"
        title="Test Post"
        body="This is the post body."
        author="testUser"
        votes={100}
        comments={5}
        subreddit="reactjs"
        image={null}
        commentData={[]}
        onPostClick={() => {}}
      />
    </Provider>
  );
  const upvoteButton = screen.getByRole('button', {
    name: '▲',
  });
  await user.click(upvoteButton);
  expect(store.getState().posts.posts[0].votes).toBe(101);
});

test('downvotes a post when the downvote button is clicked', async () => {
  const user = userEvent.setup();
  const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
    preloadedState: {
        posts: {
            posts: [
                {
                    id: '1',
                    title: 'Test Post',
                    body: 'This is the post body.',
                    author: 'testUser',
                    votes: 100,
                    comments: 5,
                    subreddit: 'reactjs',
                    image: null,
                    commentData: [],
                },
            ],
            isLoading: false,
            hasError: false,
        },
    },
  });

  render(
    <Provider store={store}>
      <Post
        id="1"
        title="Test Post"
        body="This is the post body."
        author="testUser"
        votes={100}
        comments={5}
        subreddit="reactjs"
        image={null}
        commentData={[]}
        onPostClick={() => {}}
      />
    </Provider>
  );

  const downvoteButton = screen.getByRole('button', {
    name: '▼',
  });
  await user.click(downvoteButton);
  expect(store.getState().posts.posts[0].votes).toBe(99);
});