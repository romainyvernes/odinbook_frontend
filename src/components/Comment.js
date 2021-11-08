import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../actions/commentActions';

// import components
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';

function Comment({ data, comments, deleteComment, auth }) {
  const [comment, setComment] = useState(data);
  const [enableAddComment, setEnableAddComment] = useState(false);
  const [enableEditComment, setEnableEditComment] = useState(false);

  useEffect(() => {
    // when there are changes to the comments object (presumably a comment that
    // was added), hide "new reply" input from display
    setEnableAddComment(false);
  }, [comments]);
  
  const onLikeClick = () => {
    /* 
    If comment not yet liked, send POST request to "/api/reactions" with 
    post ID as parentId, profileId, and value in the body.
    If comment needs to be unliked, send DELETE request to 
    "/api/reactions/:reactionId"
    */
  };

  const onReplyClick = () => {
    // when reply button is clicked, "new reply" input should appear
    setEnableAddComment(true);
  };

  const loadComments = () => {
    // send GET request to "/api/comments" with comment ID as parentId in the body.
  };

  const handleDeleteComment = () => {
    deleteComment(comment);
  };

  const toggleEditComment = () => {
    if (enableEditComment) {
      setEnableEditComment(false);
    } else {
      setEnableEditComment(true);
    }
  };

  let repliesDisplayed = [];
  
  // match comment's replies with their counterparts in redux state. If there 
  // is no match, the comment was never loaded
  if (data.replies.length > 0 && comments[data.post_id].length > 0) {
    repliesDisplayed = comments[data.post_id].filter((comment) => {
      for (let reply of data.replies) {
        if (reply.id === comment.id) {
          return true;
        }
      }
      return false;
    });
  }
  
  if (enableEditComment) {
    return (
      <li className="comment edit">
        <EditCommentForm comment={comment} 
                          toggleEditComment={toggleEditComment} />
      </li>
    );
  } else {
    return (
      <li className="comment">
        <div>
          <a href={`/${data.author.username}`} rel="author">{data.author.name}</a>
          <p>{data.content}</p>
        </div>
        <div>
          <button onClick={onLikeClick}>Like</button>
          <button onClick={onReplyClick}>Reply</button>
          <button onClick={handleDeleteComment}>Delete</button>
          <button onClick={toggleEditComment}>Update</button>
          <time dateTime={data.date}>{data.date}</time>
        </div>
        {
          // if there are replies to display, display them as a list
          repliesDisplayed.length > 0 && (
            <CommentsList comments={data.replies} />
          )
        }
        {
          // if a comment has replies but the user has never asked to display
          // them before, a "load replies" button should appear instead 
          repliesDisplayed.length === 0 && data.replies.length > 0 && (
            <button onClick={loadComments}>
              Load {data.replies.length} {
                data.replies.length > 1 
                  ? 'replies' 
                  : 'reply'
              }
            </button>
          )
        }
        {
          // display input to write new reply when enableAddComment is true
          enableAddComment && (
            <AddCommentForm type="reply" 
                            parentId={data.id} 
                            profileId={data.destination_profile}
                            postId={data.post_id} />
          )
        }
      </li>
    );
  }
}

Comment.propTypes = {
  comments: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  comments: state.comments,
  auth: state.auth
});

export default connect(
  mapStateToProps, 
  { deleteComment }
)(Comment);
