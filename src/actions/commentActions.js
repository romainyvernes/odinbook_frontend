import { 
  ADD_COMMENT, 
  GET_ERRORS,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from "./types";
import axios from 'axios';

export const addComment = (body) => dispatch => {
  axios.post('/api/comments', body).then((response) => {
    dispatch({
      type: ADD_COMMENT,
      payload: [response.data]
    });
  }).catch((err) => {
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const deleteComment = (comment) => dispatch => {
  axios.delete(`/api/comments/${comment.id}`).then((response) => {
    dispatch({
      type: DELETE_COMMENT,
      payload: comment
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const updateComment = (comment) => dispatch => {
  axios.put(`/api/comments/${comment.id}`, {  
    content: comment.content
  }).then((response) => {
    dispatch({
      type: UPDATE_COMMENT,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const loadComments = (parentId) => dispatch => {
  axios.get(`/api/comments?parentId=${parentId}`).then((response) => {
    dispatch({
      type: ADD_COMMENT,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

