import React, { useState } from 'react';

export default function AddCommentForm({ type, parentId }) {
  // "type" variable in props should either be "comment" if the comment is
  // directly under a post, or "reply" if it is a reply to an existing comment

  const [newComment, setNewComment] = useState('');

  const onAddCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    // send POST request to "/api/comments" with post ID or commentId as 
    // parentId, profileId, and content in the body.
  };

  return (
    <form onSubmit={handleAddComment}>
      <input type="text" 
              placeholder={`Write a ${type}...`} 
              value={newComment}
              onChange={onAddCommentChange}></input>
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}
