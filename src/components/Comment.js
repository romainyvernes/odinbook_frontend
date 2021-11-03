import React from 'react';

export default function Comment({ data }) {
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
  
  return (
    <li className="comment">
      <div>
        <a href="" rel="author">{data.author.name}</a>
        <p>{data.content}</p>
      </div>
      <div>
        <button onClick={onLikeClick}>Like</button>
        <button onClick={onReplyClick}>Reply</button>
        <time dateTime={data.date}>{data.date}</time>
      </div>
    </li>
  )
}
