import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// bootstrap components
import Button from 'react-bootstrap/Button';

// redux actions
import {
  sendFriendRequest, 
  deleteFriend, 
  acceptFriendRequest, 
  cancelFriendRequest,
  declineFriendRequest
} from "../actions/friendActions";

function FriendButton({ 
  user, 
  auth, 
  sendFriendRequest, 
  deleteFriend,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  friends
}) {
  const handleAddFriend = () => {
    const body = {
      friendId: user.id
    };
    
    sendFriendRequest(body, auth.user.username);
  };

  const handleDeleteFriend = () => {
    deleteFriend(auth.user, user.id);
  };

  const handleAcceptRequest = () => {
    const body = {
      friendId: user.id
    };

    acceptFriendRequest(body, auth.user.username);
  };

  const handleDeclineRequest = () => {
    declineFriendRequest(auth.user.username, user.id);
  };

  const handleCancelRequest = () => {
    cancelFriendRequest(auth.user.username, user.id);
  };

  const renderFriendButton = () => {
    if (auth.user.id !== user.id) {
      if (friends[auth.user.id]) {
        return <Button onClick={handleDeleteFriend}>Unfriend</Button>;
      } else if (auth.user.incomingFriendRequests[user.id]) {
        return (
          <>
            <Button onClick={handleAcceptRequest}>Accept friend request</Button>
            <Button onClick={handleDeclineRequest}>Decline friend request</Button>
          </>
        );
      } else if (auth.user.outgoingFriendRequests[user.id]) {
        return <Button onClick={handleCancelRequest}>Cancel friend request</Button>;
      } else {
        return <Button onClick={handleAddFriend}>Add as friend</Button>;
      }
    } else {
      return null;
    }
  };
  
  return (
    <div>
      {
        renderFriendButton()
      }
    </div>
  )
}

FriendButton.propTypes = {
  auth: PropTypes.object.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired,
  cancelFriendRequest: PropTypes.func.isRequired,
  declineFriendRequest: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  friends: state.friends
})

const mapDispatchToProps = {
  sendFriendRequest,
  deleteFriend,
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton)
