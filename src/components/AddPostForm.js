import React, { useState } from 'react';

export default function AddPostForm({ profileId }) {
  const [newPost, setNewPost] = useState('');

  const onAddPostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    // send POST request to "/api/posts" with profileId, and content in the body.
  };

  return (
    <form onSubmit={handleAddPost}>
      <input type="text" 
              placeholder="What's on your mind?" 
              value={newPost}
              onChange={onAddPostChange}></input>
      <button type="submit">Post</button>
    </form>
  )
}
