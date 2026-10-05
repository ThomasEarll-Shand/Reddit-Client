import React, { useState } from 'react';
import './PostModal.css';

function PostModal({ post, closeModal }) {
  const [showComments, setShowComments] = useState(false);

  if (!post) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="post-modal">
        <button
          className="modal-close"
          onClick={closeModal}
        >
          ✕
        </button>

        <p className="modal-subreddit">
          r/{post.subreddit}
        </p>

        <h2>{post.title}</h2>

        <p>{post.body}</p>

        {post.image && (
          <img
            className="modal-image"
            src={post.image}
            alt={post.title}
          />
        )}

        <div className="modal-details">
          <span>Posted by {post.author}</span>
          <span>{post.votes} votes</span>
          <button className="modal-comments-button" onClick={() => setShowComments(!showComments)}>
            💬 {post.comments} comments
          </button>
        </div>

        {showComments && (
  <div className="modal-comments">
    <h3>Comments</h3>

    {post.commentData && post.commentData.length > 0 ? (
      post.commentData.map((comment) => (
        <div
          className="modal-comment"
          key={comment.id}
        >
          <p className="modal-comment-author">
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
    </div>
  );
}

export default PostModal;