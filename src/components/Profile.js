/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  
  // retrieve user info, posts, and comments upon mounting
  useEffect(() => {
    // params property of the match object refers to parameters set in route URI
    axios.get(`/api/users/${match.params.username}`).then((response) => {
      setUser(response.user);
      setPosts(response.posts);
    }).catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  return (
    <div>
      <h2>{user.name}</h2>
      <section>
        <h3>Friends</h3>
        <ul>
          {user.friends.slice(0, 9).map((friend) => {
            return (
              <li key={friend.username}>{friend.name}</li>
            );
          })}
        </ul>
      </section>
      <section>
        <h3>Posts</h3>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post._id}>
                <h6>{post.author}</h6>
                <time dateTime={post.date}>{post.date}</time>
                <p>{post.content}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Profile;