import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// redux actions
import { updatePost, addPost } from '../actions/postActions';
import { disablePostForm, updatePostForm } from '../actions/overlaysActions';

function PostForm({  
  updatePost, 
  auth, 
  addPost,
  disablePostForm,
  overlays,
  updatePostForm
}) {
  const onContentChange = (e) => {
    updatePostForm(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (overlays.postForm.post.id) { // implies post already exists in DB
      updatePost(overlays.postForm.post);
    } else {
      const body = {
        profileId: overlays.postForm.profile.id,
        content: overlays.postForm.post.content
      };

      addPost(body);
    }
    
    disablePostForm();
  };

  const closePostForm = () => {
    disablePostForm();
  };

  return (
    <form onSubmit={handlePostSubmit} className="post-form">
      <div>
        <h2>{`${overlays.postForm.post.id ? 'Edit' : 'Create'} Post`}</h2>
        <button type="button" onClick={closePostForm}>X</button>
      </div>
      <p>{auth.user.name}</p>
      <input type="text" 
              placeholder={
                overlays.postForm.profile.id === auth.user.id
                  ? `What's on your mind?`
                  : `Write something to ${overlays.postForm.profile.first_name}...`
              }
              value={overlays.postForm.post.content}
              onChange={onContentChange}
              required></input>
      <button type="submit">{overlays.postForm.post.id ? 'Save' : 'Post'}</button>
    </form>
  )
}

PostForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  overlays: PropTypes.object.isRequired,
  disablePostForm: PropTypes.func.isRequired,
  updatePostForm: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  overlays: state.overlays
});

export default connect(mapStateToProps, { 
  updatePost, 
  addPost,
  disablePostForm,
  updatePostForm
})(PostForm);
