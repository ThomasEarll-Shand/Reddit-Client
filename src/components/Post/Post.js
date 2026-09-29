import React from 'react';
import './Post.css';

function Post({ title, body, author, votes, comments }) {
  return (
    <article className="post">
      <div className="post-votes">
        <button>▲</button>
        <p>{votes}</p>
        <button>▼</button>
      </div>

      <div className="post-content">
        <h2>{title}</h2>
        <p>{body}</p>

        <div className="post-details">
          <span>Posted by {author}</span>
          <span>💬 {comments} comments</span>
        </div>
      </div>
    </article>
  );
}

export default Post;