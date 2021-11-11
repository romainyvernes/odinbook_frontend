import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost, addPost } from '../actions/postActions';
import { disablePostForm, updatePostForm } from '../actions/postFormActions';

function PostForm({  
  updatePost, 
  auth, 
  addPost,
  disablePostForm,
  postForm,
  updatePostForm
}) {
  const onContentChange = (e) => {
    updatePostForm(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (postForm.post.id) { // implies post already exists in DB
      updatePost(postForm.post);
    } else {
      const body = {
        profileId: postForm.profile.id,
        content: postForm.post.content
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
        <h2>{`${postForm.post.id ? 'Edit' : 'Create'} Post`}</h2>
        <button type="button" onClick={closePostForm}>X</button>
      </div>
      <p>{auth.user.name}</p>
      <input type="text" 
              placeholder={
                postForm.profile.id === auth.user.id
                  ? `What's on your mind?`
                  : `Write something to ${postForm.profile.first_name}...`
              }
              value={postForm.post.content}
              onChange={onContentChange}
              required></input>
      <button type="submit">{postForm.post.id ? 'Save' : 'Post'}</button>
    </form>
  )
}

PostForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  postForm: PropTypes.object.isRequired,
  disablePostForm: PropTypes.func.isRequired,
  updatePostForm: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  postForm: state.postForm
});

export default connect(mapStateToProps, { 
  updatePost, 
  addPost,
  disablePostForm,
  updatePostForm
})(PostForm);
