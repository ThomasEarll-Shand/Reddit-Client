import React from 'react';
import './SubredditList.css';

function SubredditList() {
  const subreddits = [
    'popular',
    'javascript',
    'reactjs',
    'webdev',
    'programming',
  ];

  return (
    <aside className="subreddit-list">
      <h2>Subreddits</h2>

      {subreddits.map((subreddit) => (
        <button key={subreddit}>
          r/{subreddit}
        </button>
      ))}
    </aside>
  );
}

export default SubredditList;