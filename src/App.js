import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Post from './components/Post/Post';


const fakePosts = [
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
];


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPosts = fakePosts.filter((post) => {
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

      <main>
        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            body={post.body}
            author={post.author}
            votes={post.votes}
            comments={post.comments}
          />
        ))}
      </main>
    </div>
  );
}

export default App;