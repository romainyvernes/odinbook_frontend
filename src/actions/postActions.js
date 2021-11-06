import {
  GET_ERRORS,
  GET_POSTS,
  GET_COMMENTS
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
