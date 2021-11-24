/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// stylesheet
import '../styles/FriendsDashboard.css';

// bootstrap components
import { FaUserFriends } from 'react-icons/fa';
import { BsFillPersonPlusFill } from 'react-icons/bs';

// redux actions
import { 
  getFriends,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
} from '../actions/friendActions';

/* this component is only meant to display the authenticated user's friends
within his/her account. A separate component should be used to display any 
user's friends */
function FriendsDashboard({ 
  auth, 
  getFriends, 
  friends,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
}) {
  
  const friendsArr = Object.keys(friends).map((key) => friends[key]);
  
  // retrieve list of friends for authenticated user from API upon mounting
  useEffect(() => {
    getFriends(auth.user.username);
  }, []);

  return (
    <div className="friends-dashboard">
      <aside className="quinary-frame primary-bg-color">
        <header>
          <h1>Friends</h1>
        </header>
        <ul>
          <li>
            <NavLink exact to={"/friends"} 
                    activeClassName="selected"
                    className="friends-link sidebar-link hovered-link" >
              <i><FaUserFriends /></i>
              <h6>All Friends</h6>
            </NavLink>
          </li>
          <li>
            <NavLink exact to={"/friends/requests"} 
                    activeClassName="selected"
                    className="friends-link sidebar-link hovered-link" >
              <i><BsFillPersonPlusFill /></i>
              <h6>Friend Requests</h6>
            </NavLink>
          </li>
        </ul>
      </aside>
      <main>
        <Switch>
          <Route exact path="/friends" render={() => (
            <>
              <h2>All Friends</h2>
              <ul>
                {friendsArr.map((friend) => {
                  return (
                    <li key={friend.username} 
                        className="primary-frame primary-bg-color">
                      <p>{friend.name}</p>
                      <button>Unfriend</button>
                    </li>
                  );
                })}
              </ul>
            </>
          )} />
          <Route path="/friends/requests" render={() => (
            <>
              <h2>Friend Requests</h2>
              <ul>
                {friendsArr.map((friend) => {
                  return (
                    <li key={friend.username}
                        className="primary-frame primary-bg-color">
                      <p>{friend.name}</p>
                      <button>Unfriend</button>
                    </li>
                  );
                })}
              </ul>
            </>
          )} />
        </Switch>
      </main>
    </div>
  );
}

FriendsDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  friends: PropTypes.object.isRequired,
  getFriends: PropTypes.func.isRequired,
  getIncomingFriendRequests: PropTypes.func.isRequired,
  getOutgoingFriendRequests: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    friends: state.friends,
  };
};

const mapDispatchToProps = {
  getFriends,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsDashboard);
