import {
  GET_ERRORS,
  GET_POSTS,
  GET_COMMENTS,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
  MAP_POST_TO_COMMENTS,
  UNMAP_POST_TO_COMMENTS
} from "./types";
import axios from 'axios';

export const getPosts = (posts) => dispatch => {
  // object to store all comments by their id to facilitate lookup
  const commentsObj = {};
  
  // array of posts without their comments
  const postsOnly = posts.reduce((arr, post) => {
    const { comments, ...restOfPost} = post;

    // map comments to their post ID in comments object
    commentsObj[post.id] = comments;

    // save post without its comments
    arr.push(restOfPost);

    return arr;
  }, []);
  
  dispatch({
    type: GET_POSTS,
    payload: postsOnly
  });
  
  // NOTE: comments added to redux state are only direct comments to a post.
  // When user chooses to load replies to comments, the additional comments
  // retrieved will be added to redux state
  dispatch({
    type: GET_COMMENTS,
    payload: commentsObj
  });
};

export const deletePost = (post) => dispatch => {
  axios.delete(`/api/posts/${post.id}`).then((response) => {
    dispatch({
      type: DELETE_POST,
      payload: post
    });

    dispatch({
      type: UNMAP_POST_TO_COMMENTS,
      payload: post
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const updatePost = (post) => dispatch => {
  axios.put(`/api/posts/${post.id}`, {  
    content: post.content
  }).then((response) => {
    dispatch({
      type: UPDATE_POST,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};

export const addPost = (body) => dispatch => {
  axios.post('/api/posts', body).then((response) => {
    dispatch({
      type: ADD_POST,
      payload: response.data
    });

    dispatch({
      type: MAP_POST_TO_COMMENTS,
      payload: response.data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    });
  });
};
