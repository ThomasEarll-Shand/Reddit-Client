import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    {
      id: 1,
      title: 'My first Reddit post',
      body: 'This is some fake data while I build the app.',
      author: 'exampleUser',
      votes: 125,
      comments: 12,
    },
    {
      id: 2,
      title: 'Learning React is starting to make sense',
      body: 'Reusable components are pretty useful!',
      author: 'reactLearner',
      votes: 347,
      comments: 28,
    },
    {
      id: 3,
      title: 'What is everyone building today?',
      body: 'Share your current projects!',
      author: 'webDeveloper',
      votes: 89,
      comments: 41,
    },
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  upvotePost: (state, action) => {
    const post = state.posts.find(
      (post) => post.id === action.payload
    );

    if (post) {
      post.votes += 1;
    }
  },

  downvotePost: (state, action) => {
    const post = state.posts.find(
      (post) => post.id === action.payload
    );

    if (post) {
      post.votes -= 1;
    }
  },
}
});

export const { upvotePost, downvotePost } = postsSlice.actions;
export default postsSlice.reducer;