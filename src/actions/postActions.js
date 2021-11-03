import { 
  GET_COMMENTS, 
  RESET_COMMENTS, 
  ADD_COMMENT, 
  GET_ERRORS,
  GET_POSTS
} from "./types";

export const getPosts = (posts) => dispatch => {
  dispatch({
    type: GET_POSTS,
    payload: posts
  });
};