import { 
  SEND_FRIEND_REQUEST, 
  ACCEPT_FRIEND_REQUEST,
  GET_ERRORS,
  DECLINE_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  GET_FRIENDS,
  GET_INCOMING_FRIEND_REQUESTS,
  GET_OUTGOING_FRIEND_REQUESTS
} from "./types";
import axios from 'axios';

export const sendFriendRequest = (body, username, friend) => dispatch => {
  axios.post(`/api/users/${username}/requests`, body).then((response) => {
    dispatch({
      type: SEND_FRIEND_REQUEST,
      payload: friend
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
    dispatch({
      type: ACCEPT_FRIEND_REQUEST,
      payload: response.data
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
            type: DECLINE_FRIEND_REQUEST,
            payload: response.data
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
            type: CANCEL_FRIEND_REQUEST,
            payload: response.data
          });
        }).catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response
          });
        });
};

export const deleteFriend = (username, friendId) => dispatch => {
  axios.delete(`/api/users/${username}/friends/${friendId}`).then((response) => {
    dispatch({
      type: DECLINE_FRIEND_REQUEST,
      payload: response.data
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