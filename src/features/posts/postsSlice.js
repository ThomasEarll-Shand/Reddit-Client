import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
    isLoading: false,
    hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('/mockPosts.json');

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();

    return data.data.children.map((post) => ({
  id: post.data.id,
  title: post.data.title,
  body: post.data.selftext,
  author: post.data.author,
  votes: post.data.score,
  comments: post.data.num_comments,
  commentData: post.data.comments || [],
  subreddit: post.data.subreddit,
  image: post.data.image,
}));
  }
);

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
},

extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { upvotePost, downvotePost } = postsSlice.actions;
export default postsSlice.reducer;