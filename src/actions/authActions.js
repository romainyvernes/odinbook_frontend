import { 
  USER_LOGOUT, 
  USER_LOGIN, 
  GET_ERRORS, 
  RESET_POSTS, 
  RESET_COMMENTS, 
  DISABLE_SIGNUP_FORM,
  DISABLE_POST_FORM,
  DISABLE_REACTIONS_LIST
} from './types';
import axios from 'axios';

export const register = (body, history) => dispatch => {
  axios.post('/api/auth/register', body).then((response) => {
    // if successful, display success message with link to log in
    history.push('/');
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const login = (body) => dispatch => {
  axios.post('/api/auth/login', body).then((response) => {
    // if successful, set isLoggedIn to true in state and store username
    // redirect to home page (newsfeed)
    dispatch({
      type: USER_LOGIN,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const logout = (history) => dispatch => {
  axios.get('/api/auth/logout').then((response) => {
    // if successful, delete user from state and redirect to login page
    dispatch({
      type: USER_LOGOUT
    });

    dispatch({
      type: RESET_POSTS
    });

    dispatch({
      type: RESET_COMMENTS
    });

    dispatch({
      type: DISABLE_SIGNUP_FORM
    });

    dispatch({
      type: DISABLE_POST_FORM
    });

    dispatch({
      type: DISABLE_REACTIONS_LIST
    });

    history.push('/');
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const verifyAuth = () => dispatch => {
  axios.get('/api/auth/verify').then((response) => {
    // if user is already authenticated, follow same process as new login and
    // load user's data into state
    dispatch({
      type: USER_LOGIN,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};
