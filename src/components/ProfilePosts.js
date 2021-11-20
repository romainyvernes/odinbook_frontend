import React from 'react';

// stylesheet
import '../styles/ProfilePosts.css';

// components
import PostsList from "./PostsList";
import AddPostSection from "./AddPostSection";

export default function ProfilePosts({ user, posts }) {
  return (
    <>
      <section className="snapshot">
        <article className="primary-frame primary-bg-color">
          <header>
            <h2>Friends</h2>
          </header>
          {
            user.friends.length > 0
              ? <ul>
                  {user.friends.slice(0, 9).map((friend) => (
                    <li key={friend.username}>{friend.name}</li>
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
