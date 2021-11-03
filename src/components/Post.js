import React from 'react';
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';

export default function Post({ data }) {
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
      <a href="" rel="author">{data.author.name}</a>
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
      {data.comments.length > 0
        ? <CommentsList comments={data.comments} />
        : "Be the first to comment."
      }
      <AddCommentForm type="comment" parentId={data.id} />
    </li>
  );
}
