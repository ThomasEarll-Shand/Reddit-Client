import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Post from './components/Post/Post';
import SubredditList from './components/SubredditList/SubredditList';
import { fetchPosts } from './features/posts/postsSlice';





function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubreddit, setSelectedSubreddit] = useState('all');
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
    <p className="status-message error-message">
      Sorry, we couldn't load the posts.
    </p>
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
      subreddit={post.subreddit}
    />
  ))}
</main>

        <SubredditList
  selectedSubreddit={selectedSubreddit}
  setSelectedSubreddit={setSelectedSubreddit}
/>
      </div>
    </div>
  );
}

export default App;