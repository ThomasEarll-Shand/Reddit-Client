import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Post from './components/Post/Post';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Post 
          title="My first Reddit post" 
          body="This is some fake data while I build the app." 
          author="exampleUser" 
          votes={125} 
          comments={12} 
        />

        <Post 
          title="My second Reddit post" 
          body="This is some more fake data while I build the app." 
          author="exampleUser2" 
          votes={42} 
          comments={5} 
        />
      </main>
    </div>
  );
}

export default App;