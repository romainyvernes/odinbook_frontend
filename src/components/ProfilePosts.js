import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// stylesheet
import '../styles/ProfilePosts.css';

// components
import PostsList from "./PostsList";
import AddPostSection from "./AddPostSection";

function ProfilePosts({ user, friends, posts }) {
  const friendsArr = Object.keys(friends).map((key) => friends[key]);
  
  return (
    <>
      <section className="snapshot">
        <article className="primary-frame primary-bg-color">
          <header>
            <h2>Friends</h2>
          </header>
          {
            friendsArr.length > 0
              ? <ul>
                  {friendsArr.slice(0, 9).map((friend) => (
                    <li key={friend.username}>
                      <a href={`/${friend.username}`}>{friend.name}</a>
                    </li>
                  ))}
                </ul>
              : <p className="no-data-msg">There is no one here.</p>
          }
        </article>
      </section>
      
      <section className="profile-posts">
        <AddPostSection user={user} />

        <section>
          <h2 className="primary-frame primary-bg-color">Posts</h2>
          {posts.length > 0
          ? <PostsList posts={posts} />
          : <p className="no-data-msg">You don't have any posts yet.</p> 
          }
        </section>
      </section>
    </>
  )
}

ProfilePosts.propTypes = {
  posts: PropTypes.array.isRequired,
  friends: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  friends: state.friends,
});

export default connect(mapStateToProps)(ProfilePosts);