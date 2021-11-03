/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import PostsList from "./PostsList";

const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  
  // retrieve user info, posts, and comments upon mounting
  useEffect(() => {
    // params property of the match object refers to parameters set in route URI
    axios.get(`/api/users/${match.params.username}`).then((response) => {
      setUser(response.data.user);
      setPosts(response.data.posts);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const onAddPostClick = () => {
    // display an add post form over the entire page
  };
  
  if (user.name !== undefined) {
    return (
      <div>
        <h2>{user.name}</h2>
        <section>
          <h3>Friends</h3>
          <ul>
            {user.friends.slice(0, 9).map((friend) => (
              <li key={friend.username}>{friend.name}</li>
            ))}
          </ul>
        </section>

        <section>
          <button onClick={onAddPostClick}>What's on your mind?</button>
        </section>

        <section>
          <h3>Posts</h3>
          {posts.length > 0
           ? <PostsList posts={posts} />
           : "You don't have any posts yet." 
          }
        </section>
      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    );
  }
};

export default Profile;