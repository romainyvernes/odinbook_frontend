import React, { useState } from 'react';
import axios from 'axios';

export default function AddCommentForm({ type, parentId, profileId }) {
  // "type" variable in props should either be "comment" if the comment is
  // directly under a post, or "reply" if it is a reply to an existing comment

  const [newComment, setNewComment] = useState('');

  const onAddCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    
    axios.post(`/api/comments`, {
      parentId,
      profileId,
      content: newComment
    }).then((response) => {
      // upon successful response, reset value of comment input
      if (response.status === 201) {
        setNewComment('');
      } else {
        console.log('Comment could not be added.');
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <form onSubmit={handleAddComment}>
      <input type="text" 
              placeholder={`Write a ${type}...`} 
              value={newComment}
              onChange={onAddCommentChange}
              required></input>
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}
