import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateComment } from '../actions/commentActions';

function EditCommentForm({ comment, updateComment, toggleEditComment }) {
  const [updatedComment, setUpdatedComment] = useState(comment);

  const onUpdateCommentChange = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();

    updateComment(updatedComment);
  };

  return (
    <form onSubmit={handleUpdateComment}>
      <input type="text" 
              placeholder={`Write a ${
                updatedComment.post_id === updatedComment.parent_id
                  ? 'comment'
                  : 'reply'
              }...`} 
              value={updatedComment.content}
              onChange={onUpdateCommentChange}
              required></input>
      <button onClick={toggleEditComment}>Cancel</button>
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}

EditCommentForm.propTypes = {
  updateComment: PropTypes.func.isRequired
};

export default connect(null, { updateComment })(EditCommentForm);
