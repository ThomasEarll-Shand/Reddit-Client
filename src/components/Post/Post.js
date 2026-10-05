import React, { useState } from 'react';
import './Post.css';
import { useDispatch } from 'react-redux';
import { upvotePost, downvotePost } from '../../features/posts/postsSlice';

function Post({ id, title, body, author, votes, comments, commentData, subreddit, image, onPostClick }) {
    const dispatch = useDispatch();
    const [showComments, setShowComments] = useState(false);
  return (
    <article className="post" onClick={onPostClick}>
      <div className="post-votes">
        <button onClick={(event) => {event.stopPropagation(); dispatch(upvotePost(id));}}>▲</button>
        <p>{votes}</p>
        <button onClick={(event) => {event.stopPropagation(); dispatch(downvotePost(id));}}>▼</button>
      </div>

      <div className="post-content">
        <p className="post-subreddit">r/{subreddit}</p>
        <h2>{title}</h2>
        <p>{body}</p>

        {image && <img className="post-image" src={image} alt={title} />}

        <div className="post-details">
          <span>Posted by {author}</span>
          <span>
            <button className="comments-button" onClick={(event) => {event.stopPropagation(); setShowComments(!showComments);}}>
                💬 {comments} comments
            </button>
          </span>
        </div>

        {showComments && (
  <div className="comments-section">
    {commentData.length > 0 ? (
      commentData.map((comment) => (
        <div className="comment" key={comment.id}>
          <p className="comment-author">
            {comment.author}
          </p>

          <p>{comment.body}</p>
        </div>
      ))
    ) : (
      <p className="no-comments">
        No comments to display.
      </p>
    )}
  </div>
)}
      </div>
    </article>
  );
}

export default Post;