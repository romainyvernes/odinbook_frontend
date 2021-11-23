import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// stylesheet
import '../styles/ProfileFriends.css';

// redux actions
import { 
  deleteFriend, 
  deleteFriendFromAuth,
} from '../actions/friendActions';

// components
import DropdownMenu from './DropdownMenu';
import FriendButton from './FriendButton';

function ProfileFriends({ 
  friends, 
  deleteFriend, 
  auth, 
  user,
  deleteFriendFromAuth,
}) {
  const friendsArr = Object.keys(friends).map((key) => friends[key]);
  
  const handleUnfriend = () => {
    // check if list of friends on display belongs to authenticated user
    if (user.id === auth.user.id) {
      // delete friend from posts to reflect change in the list of friends
      deleteFriend(auth.user, user.id);
    } else {
      // only delete friend from auth object
      deleteFriendFromAuth(auth.user, user.id);
    }
  };
  
  const dropdownItems = [
    {
      label: "Unfriend",
      function: handleUnfriend
    }
  ];
  
  return (
    <section className="profile-friends primary-frame primary-bg-color">
      <header>
        <h2>Friends</h2>
      </header>
      {
        friendsArr.length > 0
          ? <ul>
              {
                friendsArr.map((friend) => (
                  <li key={friend.id}>
                    <a href={`/${friend.username}`}>
                      {friend.name}
                    </a>
                    {
                      // only display something if listed user is not 
                      // authenticated user, and display an add friend button
                      // if listed user is not friends w/ authenticated user
                      friend.id !== auth.user.id
                        ? !auth.user.friends[friend.id]
                            ? <FriendButton user={user} />
                            : <DropdownMenu items={dropdownItems} />
                        : null
                    }
                  </li>
                ))
              }
            </ul>
          : <p className="no-data-msg">There is no one here.</p>
      }
    </section>
  )
}

ProfileFriends.propTypes = {
  deleteFriend: PropTypes.func.isRequired,
  friends: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteFriendFromAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  friends: state.friends,
  auth: state.auth,
});

export default connect(mapStateToProps, { 
  deleteFriend,
  deleteFriendFromAuth,
})(ProfileFriends);
