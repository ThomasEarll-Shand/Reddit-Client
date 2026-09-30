import React from 'react';
import './Post.css';
import { useDispatch } from 'react-redux';
import { upvotePost, downvotePost } from '../../features/posts/postsSlice';

function Post({ id, title, body, author, votes, comments }) {
    const dispatch = useDispatch();
  return (
    <article className="post">
      <div className="post-votes">
        <button onClick={() => dispatch(upvotePost(id))}>▲</button>
        <p>{votes}</p>
        <button onClick={() => dispatch(downvotePost(id))}>▼</button>
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