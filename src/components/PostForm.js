import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost } from '../actions/postActions';

function PostForm({ post, updatePost, toggleEditPost, auth }) {
  const [updatedPost, setUpdatedPost] = useState(post || { content: '' });

  const onContentChange = (e) => {
    const update = {...updatedPost};
    update.content = e.target.value;
    setUpdatedPost(update);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();

    updatePost(updatedPost);
  };

  return (
    <form onSubmit={handleUpdatePost} className="post-form">
      <div>
        <h2>{`${post.id ? 'Edit' : 'Create'} Post`}</h2>
        <button type="button" onClick={toggleEditPost}>X</button>
      </div>
      <p>{auth.user.name}</p>
      <input type="text" 
              placeholder="What's on your mind?"
              value={updatedPost.content}
              onChange={onContentChange}
              required></input>
      <button type="submit">{post.id ? 'Save' : 'Post'}</button>
    </form>
  )
}

PostForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { updatePost })(PostForm);
