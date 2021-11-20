import { 
  SEND_FRIEND_REQUEST, 
  ACCEPT_FRIEND_REQUEST,
  GET_ERRORS
} from "./types";
import axios from 'axios';

export const sendFriendRequest = (body) => dispatch => {
  axios.post('/api/posts', body).then((response) => {
    dispatch({
      type: SEND_FRIEND_REQUEST,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

