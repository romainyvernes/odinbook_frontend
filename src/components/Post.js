import React from 'react';
import { connect } from 'react-redux';

// components
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';

function Post({ data, comments }) {
  const onLikeClick = () => {
    /* 
    If comment not yet liked, send POST request to "/api/reactions" with 
    post ID as parentId, profileId, and value in the body.
    If comment needs to be unliked, send DELETE request to 
    "/api/reactions/:reactionId"
    */
  };

  const onCommentClick = () => {
    // focus on comment input area
  };
  
  return (
    <li className="post">
      <a href={`/${data.author.username}`} rel="author">{data.author.name}</a>
      <time dateTime={data.date}>{data.date}</time>
      <p>{data.content}</p>
      {data.reactions.length > 0 && 
        <div>
          {data.reactions.length}
        </div>
      }
      <div>
        <button onClick={onLikeClick}>
          <i></i>
          <span>Like</span>
        </button>
        <button onClick={onCommentClick}>
          <i></i>
          <span>Comment</span>
        </button>
      </div>
      {comments[data.id] && comments[data.id].length > 0
        ? <CommentsList comments={comments[data.id].filter((comment) => (
          comment.parent_id === data.id
        ))} />
        : "Be the first to comment."
      }
      <AddCommentForm type="comment" 
                      parentId={data.id} 
                      profileId={data.destination_profile}
                      postId={data.id} />
    </li>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments
});

export default connect(mapStateToProps)(Post);
