/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router";

// stylesheet
import '../styles/Profile.css';

// redux actions
import { getPosts } from '../actions/postActions';

// components
import PostsList from "./PostsList";
import AddPostSection from "./AddPostSection";


function Profile({ match, getPosts, posts, auth }) {
  const [user, setUser] = useState({});
  
  // retrieve user info, posts, and comments upon mounting
  useEffect(() => {
    /* params property of the match object refers to parameters set in route URI
    NOTE: API call is made locally rather than in redux action because the route
    differs in each component where posts appear */
    axios.get(`/api/users/${match.params.username}`).then((response) => {
      // save info about owner of profile displayed to local state
      setUser(response.data.user);
      
      // save posts being displayed to redux store
      getPosts(response.data.posts);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  
  return (
    <div className="profile">
      {
        user.name !== undefined
          ? <>
              <header className="profile-header primary-bg-color quinary-frame">
                <h1>{user.name}</h1>
              </header>
              <main>
                <Switch>
                  <Route path="/:username">
                    <>
                      <section className="snapshot">
                        <article className="primary-frame primary-bg-color">
                          <header>
                            <h2>Friends</h2>
                          </header>
                          <ul>
                            {user.friends.slice(0, 9).map((friend) => (
                              <li key={friend.username}>{friend.name}</li>
                            ))}
                          </ul>
                        </article>
                      </section>
                      
                      <section className="profile-posts">
                        <AddPostSection user={user} />
        
                        <section>
                          <h2 className="primary-frame primary-bg-color">Posts</h2>
                          {posts.length > 0
                          ? <PostsList posts={posts} />
                          : "You don't have any posts yet." 
                          }
                        </section>
                      </section>
                    </>
                  </Route>
                </Switch>
              </main>
            </>
          : <>
              Loading...
            </>
      }
    </div>
  );
}

Profile.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Profile);