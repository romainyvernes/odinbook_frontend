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
  isFocused
}) {
  // "type" variable in props should either be "comment" if the comment is
  // directly under a post, or "reply" if it is a reply to an existing comment

  const [newComment, setNewComment] = useState('');
  const commentInput = useRef();

  useEffect(() => {
    setNewComment('');
  }, [comments]);

  useEffect(() => {
    if (isFocused) {
      commentInput.current.focus();
    }
  }, [isFocused]);

  const onAddCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    
    const body = {
      parentId,
      profileId,
      postId,
      content: newComment
    };

    addComment(body);
  };

  return (
    <form onSubmit={handleAddComment}>
      <input type="text" 
              placeholder={`Write a ${type}...`} 
              value={newComment}
              onChange={onAddCommentChange}
              ref={commentInput}
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
