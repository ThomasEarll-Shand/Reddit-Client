import React from 'react';
import './SubredditList.css';

function SubredditList({ selectedSubreddit, setSelectedSubreddit}) {
  const subreddits = [
    'all',
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
        <button
  key={subreddit}
  onClick={() => setSelectedSubreddit(subreddit)}
  className={
    selectedSubreddit === subreddit ? 'active' : ''
  }
>
  {subreddit === 'all' ? 'All' : `r/${subreddit}`}
</button>
      ))}
    </aside>
  );
}

export default SubredditList;