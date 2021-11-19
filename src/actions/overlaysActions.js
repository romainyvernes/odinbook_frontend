import { 
  ENABLE_POST_FORM, 
  DISABLE_POST_FORM,
  UPDATE_POST_FORM,
  ENABLE_REACTIONS_LIST,
  DISABLE_REACTIONS_LIST
} from "./types";

export const enablePostForm = (post = {}, profile = {}) => dispatch => {
  dispatch({
    type: ENABLE_POST_FORM,
    payload: {
      post,
      profile
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

export const enableReactionsList = (reactions) => dispatch => {
  dispatch({
    type: ENABLE_REACTIONS_LIST,
    payload: reactions
  });
};

export const disableReactionsList = () => dispatch => {
  dispatch({
    type: DISABLE_REACTIONS_LIST
  });
};