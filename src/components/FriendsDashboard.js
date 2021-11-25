/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

// stylesheet
import '../styles/FriendsDashboard.css';

// bootstrap components
import { FaUserFriends } from 'react-icons/fa';
import { BsFillPersonPlusFill } from 'react-icons/bs';

// redux actions
import { 
  getFriends,
  getIncomingFriendRequests,
  deleteFriend,
  addFriend,
  declineFriendRequest,
} from '../actions/friendActions';

// react components
import FriendsList from './FriendsList';

/* this component is only meant to display the authenticated user's friends
within his/her account. A separate component should be used to display any 
user's friends */
function FriendsDashboard({ 
  auth, 
  getFriends,
  getIncomingFriendRequests,
  deleteFriend,
  addFriend,
  declineFriendRequest,
}) {

  const handleAddFriend = (parentId) => {
    const body = {
      friendId: parentId
    };
    
    addFriend(body, auth.user.username);
  };

  const handleDeleteFriend = (parentId) => {
    deleteFriend(auth.user, parentId);
  };

  const handleDeclineRequest = (parentId) => {
    declineFriendRequest(auth.user.username, parentId);
  };

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
            <FriendsList heading={"All Friends"}
                          key={uuid()}
                          getApiData={() => {
                            getFriends(auth.user.username);
                          }}
                          buttonItems={[
                            {
                              label: "Unfriend",
                              function: handleDeleteFriend
                            }
                          ]} />
          )} />
          <Route path="/friends/requests" render={() => (
            <FriendsList heading={"Friend Requests"}
                          key={uuid()}
                          getApiData={() => {
                            getIncomingFriendRequests(auth.user.username);
                          }}
                          buttonItems={[
                            {
                              label: "Accept",
                              function: handleAddFriend
                            },
                            {
                              label: "Decline",
                              function: handleDeclineRequest,
                              props: {
                                className: "secondary-bg-color"
                              }
                            }
                          ]} />
          )} />
        </Switch>
      </main>
    </div>
  );
}

FriendsDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getFriends: PropTypes.func.isRequired,
  getIncomingFriendRequests: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  declineFriendRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  getFriends,
  getIncomingFriendRequests,
  deleteFriend,
  addFriend,
  declineFriendRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsDashboard);
