import { 
  ENABLE_POST_FORM, 
  DISABLE_POST_FORM,
  UPDATE_POST_FORM
} from "../actions/types";

const initialState = {
  postForm: {
    isEnabled: false,
    post: {
      content: ''
    },
    profile: {}
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, { type, payload }) {
  switch(type) {
    case ENABLE_POST_FORM:
      if (payload.post && payload.post.id) { // implies a post was passed in
        return {
          ...state,
          postForm: {
            isEnabled: true,
            post: payload.post,
            profile: payload.post.destination_profile
          }
        };
      } else { // imples a new post is being created
        return {
          ...state,
          postForm: {
            isEnabled: true,
            profile: payload.profile
          }
        };
      }

    case DISABLE_POST_FORM:
      return {
        ...state,
        postForm: {
          isEnabled: false,
          post: {
            content: ''
          },
          profile: {}
        }
      };

    case UPDATE_POST_FORM:
      const updatedPost = {...state.post};
      updatedPost.content = payload;
      
      return {
        ...state,
        postForm: {
          ...state.postForm,
          post: updatedPost
        }
      };
      
    default:
      return state;
  }
}