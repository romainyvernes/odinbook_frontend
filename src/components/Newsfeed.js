/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

// redux action types
import { GET_ERRORS } from '../actions/types';

// redux actions
import { getPosts } from '../actions/postActions';

// stylesheets
import '../styles/Newsfeed.css';

// react components
import AddPostSection from './AddPostSection';
import HomeSidebar from './HomeSidebar';
import PostsList from './PostsList';

// component to display recent posts by any user on the platform
function Newsfeed({ auth, getPosts, posts }) {
  const dispatch = useDispatch();

  // retrieve recent posts from API upon mounting
  useEffect(() => {
    /* NOTE: API call is made locally rather than in redux action because the 
    route differs in each component where posts appear */
    axios.get('/api/posts?recent=true').then((response) => {
      // save posts being displayed to redux store
      getPosts(response.data);
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
  }, []);

  return (
    <div className="newsfeed">
      <HomeSidebar />

      <main>
        <AddPostSection />
        
        {
          posts.length > 0
            ? <PostsList posts={posts} />
            : <p className="no-data-msg">
                It looks like no one has posted anything yet.
              </p>
        }
      </main>
    </div>
  );
}

Newsfeed.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts
  };
};

export default connect(mapStateToProps, { getPosts })(Newsfeed);
