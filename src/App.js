import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Post from './components/Post/Post';
import SubredditList from './components/SubredditList/SubredditList';
import { fetchPosts } from './features/posts/postsSlice';
import PostModal from './components/PostModal/PostModal';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubreddit, setSelectedSubreddit] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const { posts, isLoading, hasError } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(fetchPosts());
}, [dispatch]);

  
  const filteredPosts = posts.filter((post) => {
  const searchText = searchTerm.toLowerCase();

  const matchesSearch =
    post.title.toLowerCase().includes(searchText) ||
    post.body.toLowerCase().includes(searchText);
  
  const matchesSubreddit =
    selectedSubreddit === 'all' ||
    post.subreddit === selectedSubreddit;

    return matchesSearch && matchesSubreddit;
  });

  return (
    <div className="App">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="content">
        <main>
  {isLoading && (
    <p className="status-message">
      Loading posts...
    </p>
  )}

  {hasError && (
    <div className="status-message error-message">
    <p className="status-message error-message">
      Sorry, we couldn't load the posts.
      <button className="retry-button" onClick={() => dispatch(fetchPosts())}>
        Try Again
      </button>
    </p>
    </div>
  )}

  {!isLoading && !hasError && filteredPosts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      body={post.body}
      author={post.author}
      votes={post.votes}
      comments={post.comments}
      commentData={post.commentData}
      subreddit={post.subreddit}
      image={post.image}
      onPostClick={() => setSelectedPost(post)}
    />
  ))}
</main>

        <SubredditList
  selectedSubreddit={selectedSubreddit}
  setSelectedSubreddit={setSelectedSubreddit}
/>
      </div>

      {selectedPost && (
  <PostModal
    post={selectedPost}
    closeModal={() => setSelectedPost(null)}
  />
)}
    </div>
  );
}

export default App;