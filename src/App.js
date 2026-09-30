import React, { useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Post from './components/Post/Post';
import SubredditList from './components/SubredditList/SubredditList';





function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const posts = useSelector((state) => state.posts.posts);
  const filteredPosts = posts.filter((post) => {
    const searchText = searchTerm.toLowerCase();

    return (
      post.title.toLowerCase().includes(searchText) ||
      post.body.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="App">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="content">
        <main>
          {filteredPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              author={post.author}
              votes={post.votes}
              comments={post.comments}
            />
          ))}
        </main>

        <SubredditList />
      </div>
    </div>
  );
}

export default App;