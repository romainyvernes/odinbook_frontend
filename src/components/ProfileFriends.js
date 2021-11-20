import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// stylesheet
import '../styles/ProfileFriends.css';

// redux actions
import { deleteFriend } from '../actions/friendActions';

// components
import DropdownMenu from './DropdownMenu';

function ProfileFriends({ friends, deleteFriend }) {
  const handleUnfriend = () => {
    // pass in required args
    deleteFriend();
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
        friends.length > 0
          ? <ul>
              {
                friends.map((friend) => (
                  <li key={friend.id}>
                    <Link to={`/${friend.username}`}>
                      {friend.name}
                    </Link>
                    <DropdownMenu items={dropdownItems} />
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
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { deleteFriend })(ProfileFriends);
