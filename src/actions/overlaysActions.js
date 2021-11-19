import { 
  ENABLE_POST_FORM, 
  DISABLE_POST_FORM,
  ENABLE_REACTIONS_LIST,
  DISABLE_REACTIONS_LIST,
  ENABLE_SIGNUP_FORM,
  DISABLE_SIGNUP_FORM
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

export const enableSignupForm = () => dispatch => {
  dispatch({
    type: ENABLE_SIGNUP_FORM
  });
};

export const disableSignupForm = () => dispatch => {
  dispatch({
    type: DISABLE_SIGNUP_FORM
  });
};