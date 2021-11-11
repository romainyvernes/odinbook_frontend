import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../actions/commentActions';

function AddCommentForm({ 
  type, 
  parentId, 
  postId, 
  profileId, 
  comments, 
  addComment,
  isFocused,
  disableAddCommentFocus
}) {
  // "type" variable in props should either be "comment" if the comment is
  // directly under a post, or "reply" if it is a reply to an existing comment
  // console.log(postId + ': ' + isFocused)
  const [commentContent, setCommentContent] = useState('');
  const commentInputEl = useRef();

  useEffect(() => {
    setCommentContent('');
  }, [comments]);

  useEffect(() => {
    if (isFocused) {
      commentInputEl.current.focus();
    }
  }, [isFocused]);

  const onAddCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    
    const body = {
      parentId,
      profileId,
      postId,
      content: commentContent
    };

    addComment(body);
  };

  return (
    <form onSubmit={handleAddComment}>
      <input type="text" 
              placeholder={`Write a ${type}...`} 
              value={commentContent}
              onChange={onAddCommentChange}
              onBlur={disableAddCommentFocus}
              ref={commentInputEl}
              required></input>
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}

AddCommentForm.propTypes = {
  comments: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  comments: state.comments
});

export default connect(mapStateToProps, { addComment })(AddCommentForm);
