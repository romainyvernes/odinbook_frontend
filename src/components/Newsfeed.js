/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

// component to display recent posts by user's friends
function Newsfeed({ auth }) {
  const [posts, setPosts] = useState([]);
  
  // retrieve list of friends for authenticated user from API upon mounting
  useEffect(() => {
    axios.get(`/api/posts?authorId=`).then((response) => {
      setPosts();
    }).catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  return (
    <div>
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
