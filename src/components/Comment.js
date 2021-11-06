import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../actions/commentActions';

// import components
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';

function Comment({ data, comments }) {
  const [comment, setComment] = useState(data);
  
  const onLikeClick = () => {
    /* 
    If comment not yet liked, send POST request to "/api/reactions" with 
    post ID as parentId, profileId, and value in the body.
    If comment needs to be unliked, send DELETE request to 
    "/api/reactions/:reactionId"
    */
  };

  const onReplyClick = () => {
    // display an add reply form
  };

  const loadComments = () => {
    // send GET request to "/api/comments" with comment ID as parentId in the body.
  };

  const onDeleteComment = () => {
    deleteComment(comment);
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
    <li className="comment">
      <div>
        <a href={`/${data.author.username}`} rel="author">{data.author.name}</a>
        <p>{data.content}</p>
      </div>
      <div>
        <button onClick={onLikeClick}>Like</button>
        <button onClick={onReplyClick}>Reply</button>
        <button onClick={onDeleteComment}>Delete</button>
        <time dateTime={data.date}>{data.date}</time>
      </div>
      {repliesDisplayed.length > 0 && (
        <CommentsList comments={data.replies} />
      )}
      {repliesDisplayed.length === 0 && data.replies.length > 0 && (
        <button onClick={loadComments}>Load {data.replies.length} replies</button>
      )}
    </li>
  )
}

const mapStateToProps = (state) => ({
  comments: state.comments
});

export default connect(mapStateToProps)(Comment);
