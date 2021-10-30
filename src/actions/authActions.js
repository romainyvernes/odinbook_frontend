import { USER_LOGOUT, USER_LOGIN, HANDLE_ERRORS } from './types';
import axios from 'axios';

export const register = (body, history) => dispatch => {
  axios.post('/api/auth/register', body).then((response) => {
    // if successful, display success message with link to log in
    history.push('/');
  }).catch((err) => {
    dispatch({
      type: HANDLE_ERRORS,
      payload: err.response.data
    });
  });
};

export const login = (body, history) => dispatch => {
  axios.post('/api/auth/login', body).then((user) => {
    // if successful, set isLoggedIn to true in state and store username
    // redirect to home page (newsfeed)
    dispatch({
      type: USER_LOGIN,
      payload: user
    });

    history.push('/');
  }).catch((err) => {
    dispatch({
      type: HANDLE_ERRORS,
      payload: err.response.data
    });
  });
};

export const logout = (history) => dispatch => {
  axios.get('/api/auth/logout').then((response) => {
    // if successful, display success message with link to log in
    history.push('/');
  }).catch((err) => {
    dispatch({
      type: HANDLE_ERRORS,
      payload: err.response.data
    });
  });
};

export const verifyAuth = () => dispatch => {
  axios.get('/api/auth/verify').then((user) => {
    // if user is already authenticated, follow same process as new login and
    // load user's data into state
    dispatch({
      type: USER_LOGIN,
      payload: user
    });
  }).catch((err) => {
    dispatch({
      type: HANDLE_ERRORS,
      payload: err.response.data
    });
  });
};
