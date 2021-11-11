import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, loadComments } from '../actions/commentActions';
import { addReaction, deleteReaction } from '../actions/reactionActions';

// import components
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';
import PrivateButton from './PrivateButton';

function Comment({ 
  data, 
  comments, 
  deleteComment, 
  auth, 
  addReaction, 
  deleteReaction,
  loadComments
}) {
  const comment = useRef(data);
  const [enableAddComment, setEnableAddComment] = useState(false);
  const [enableEditComment, setEnableEditComment] = useState(false);

  useEffect(() => {
    // when there are changes to the comments object, hide "edit reply" input 
    // from display
    setEnableEditComment(false);
  }, [comments]);
  
  const toggleLike = () => {
    // look for an existing reaction by authenticated user
    const currentReaction = data.reactions.find((reaction) => (
      reaction.author.id === auth.user.id
    ));
    
    if (currentReaction) {
      deleteReaction(currentReaction, comment.current);
    } else {
      const body = {
        parentId: comment.current.id,
        profileId: comment.current.destination_profile,
        value: 'Like'
      };

      addReaction(body, comment.current);
    }
  };

  const onReplyClick = () => {
    // when reply button is clicked, "new reply" input should appear
    setEnableAddComment(true);
  };

  const handleLoadComments = () => {
    loadComments(comment.current.id);
  };

  const handleDeleteComment = () => {
    deleteComment(comment.current);
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
  
  return (
    <li className={`comment ${enableEditComment && 'edit'}`}>
      {
        // toggle between display to edit a comment and display to view a
        // comment
        enableEditComment
          ? <EditCommentForm comment={comment.current} 
                            toggleEditComment={toggleEditComment} />
          : <div>
              <div>
                <a href={`/${data.author.username}`} rel="author">
                  {data.author.name}
                </a>
                <p>{data.content}</p>
              </div>
              <div>
                <button onClick={toggleLike}>
                  {
                    data.reactions.find((reaction) => (
                      reaction.author.id === auth.user.id
                    ))
                      ? 'Unlike'
                      : 'Like'
                  }
                </button>
                <button onClick={onReplyClick}>Reply</button>
                <PrivateButton onClick={handleDeleteComment} 
                                parentElement={data}
                                label="Delete" />
                <PrivateButton onClick={toggleEditComment} 
                                parentElement={data}
                                label="Update" />
                <time dateTime={data.date}>{data.date}</time>
              </div>
            </div>
      }
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
          <button onClick={handleLoadComments}>
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

Comment.propTypes = {
  comments: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addReaction: PropTypes.func.isRequired,
  deleteReaction: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  comments: state.comments,
  auth: state.auth
});

export default connect(mapStateToProps, { 
  deleteComment,
  addReaction,
  deleteReaction,
  loadComments
})(Comment);
