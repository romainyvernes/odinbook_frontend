import React from 'react';
import Comment from './Comment';

export default function CommentsList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </ul>
  );
}
