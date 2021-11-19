import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

// stylesheets
import '../styles/PostForm.css';

// redux actions
import { updatePost, addPost } from '../actions/postActions';
import { disablePostForm } from '../actions/overlaysActions';

function PostForm({  
  updatePost, 
  auth, 
  addPost,
  disablePostForm,
  overlays: { postForm, ...otherKeys},
}) {

  const [postContent, setPostContent] = useState(postForm?.post?.content || '');
  const submitBtn = useRef();

  useEffect(() => {
    if (postContent === '') {
      submitBtn.current.disabled = true;
    } else {
      submitBtn.current.disabled = false;
    }
  }, [postContent]);

  const onContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (postForm.post) { // implies post already exists in DB
      const updatedPost = {...postForm.post};
      updatedPost.content = postContent;
      updatePost(updatedPost);
    } else {
      const body = {
        profileId: postForm.profile.id,
        content: postContent
      };

      addPost(body);
    }
    
    disablePostForm();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title as={"h2"}>
          {`${postForm.post ? 'Edit' : 'Create'} Post`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body as={"form"} onSubmit={handlePostSubmit} className="post-form">
        <h3>{auth.user.name}</h3>
        <textarea type="text" 
                placeholder={
                  postForm.profile.id === auth.user.id
                    ? `What's on your mind?`
                    : `Write something to ${postForm.profile.first_name}...`
                }
                value={postContent}
                onChange={onContentChange}
                required></textarea>
        <button ref={submitBtn} 
                type="submit" 
                className="tertiary-bg-color tertiary-font-color" 
                disabled>
          {postForm.post ? 'Save' : 'Post'}
        </button>
      </Modal.Body>
    </>
  )
}

PostForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  overlays: PropTypes.object.isRequired,
  disablePostForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  overlays: state.overlays
});

export default connect(mapStateToProps, { 
  updatePost, 
  addPost,
  disablePostForm,
})(PostForm);
