/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostsList from './PostsList';

// component to display recent posts by any user on the platform
function Newsfeed({ auth }) {
  const [posts, setPosts] = useState([]);
  
  // retrieve recent posts from API upon mounting
  useEffect(() => {
    axios.get('/api/posts?recent=true').then((response) => {
      setPosts(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      {posts.length > 0
        ? <PostsList posts={posts} />
        : "It looks like no one has posted anything yet." 
      }
    </div>
  );
}

Newsfeed.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Newsfeed);
