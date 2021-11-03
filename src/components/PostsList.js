import React from 'react';
import Post from './Post';

export default function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))
      }
    </ul>
  );
}
