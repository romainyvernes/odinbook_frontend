import { 
  ADD_FRIEND_REQUEST, 
  ADD_FRIEND,
  GET_ERRORS,
  DELETE_FRIEND_REQUEST,
  GET_FRIENDS,
  GET_INCOMING_FRIEND_REQUESTS,
  GET_OUTGOING_FRIEND_REQUESTS,
  DELETE_FRIEND,
  DELETE_FRIEND_FROM_AUTH,
  ADD_FRIEND_TO_AUTH
} from "./types";
import axios from 'axios';

export const sendFriendRequest = (body, username) => dispatch => {
  axios.post(`/api/users/${username}/requests`, body).then((response) => {
    dispatch({
      type: ADD_FRIEND_REQUEST,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const acceptFriendRequest = (body, username) => dispatch => {
  axios.post(`/api/users/${username}/friends`, body).then((response) => {
    // add friend to friends object in redux store
    dispatch({
      type: ADD_FRIEND,
      payload: response.data.user
    });

    // remove added friend from outgoing friend requests in redux store
    dispatch({
      type: DELETE_FRIEND_REQUEST,
      payload: response.data.id
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const declineFriendRequest = (username, friendId) => dispatch => {
  axios.delete(`/api/users/${username}/requests/${friendId}?decline=true`)
       .then((response) => {
          dispatch({
            type: DELETE_FRIEND_REQUEST,
            payload: friendId
          });
        }).catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response
          });
        });
};

export const cancelFriendRequest = (username, friendId) => dispatch => {
  axios.delete(`/api/users/${username}/requests/${friendId}?unsend=true`)
       .then((response) => {
          dispatch({
            type: DELETE_FRIEND_REQUEST,
            payload: friendId
          });
        }).catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response
          });
        });
};

export const deleteFriend = (user, friendId) => dispatch => {
  axios.delete(`/api/users/${user.username}/friends/${friendId}`).then((response) => {
    dispatch({
      type: DELETE_FRIEND,
      payload: {
        userId: user.id,
        friendId
      }
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const saveFriends = (friends) => dispatch => {
  dispatch({
    type: GET_FRIENDS,
    payload: friends
  });
};

export const getFriends = (username) => dispatch => {
  axios.get(`/api/users/${username}/friends`).then((response) => {
    dispatch({
      type: GET_FRIENDS,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const getIncomingFriendRequests = (username) => dispatch => {
  axios.get(`/api/users/${username}/requests?received=true`).then((response) => {
    dispatch({
      type: GET_INCOMING_FRIEND_REQUESTS,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const getOutgoingFriendRequests = (username) => dispatch => {
  axios.get(`/api/users/${username}/requests?sent=true`).then((response) => {
    dispatch({
      type: GET_OUTGOING_FRIEND_REQUESTS,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

// removes friend from friends object in auth.user
export const deleteFriendFromAuth = (user, friendId) => dispatch => {
  axios.delete(`/api/users/${user.username}/friends/${friendId}`).then((response) => {
    dispatch({
      type: DELETE_FRIEND_FROM_AUTH,
      payload: friendId
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const addFriendToAuth = (body, username) => dispatch => {
  axios.post(`/api/users/${username}/friends`, body).then((response) => {
    // add friend to friends object in redux store
    dispatch({
      type: ADD_FRIEND_TO_AUTH,
      payload: response.data.user
    });

    // remove added friend from outgoing friend requests in redux store
    dispatch({
      type: DELETE_FRIEND_REQUEST,
      payload: response.data.id
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};