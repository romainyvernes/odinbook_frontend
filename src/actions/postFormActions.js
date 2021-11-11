import { 
  ENABLE_POST_FORM, 
  DISABLE_POST_FORM,
  UPDATE_POST_FORM
} from "./types";

export const enablePostForm = (post = {}, author = {}) => dispatch => {
  dispatch({
    type: ENABLE_POST_FORM,
    payload: {
      post,
      author
    }
  });
};

export const disablePostForm = () => dispatch => {
  dispatch({
    type: DISABLE_POST_FORM
  });
};

export const updatePostForm = (content) => dispatch => {
  dispatch({
    type: UPDATE_POST_FORM,
    payload: content
  });
};