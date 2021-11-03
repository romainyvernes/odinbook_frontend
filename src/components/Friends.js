/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

/* this component is only meant to display the authenticated user's friends
within his/her account. A separate component should be used to display any 
user's friends */
function Friends({ auth }) {
  const [friends, setFriends] = useState([]);
  
  // retrieve list of friends for authenticated user from API upon mounting
  useEffect(() => {
    axios.get(`/api/users/${auth.user.username}/friends`).then((response) => {
      setFriends(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      <ul>
        {friends.map((friend) => {
          return (
            <li key={friend.username}>
              <p>{friend.name}</p>
              <button>Unfriend</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Friends.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Friends);
