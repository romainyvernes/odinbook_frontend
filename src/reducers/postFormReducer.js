import { 
  ENABLE_POST_FORM, 
  DISABLE_POST_FORM,
  UPDATE_POST_FORM
} from "../actions/types";

const initialState = {
  isEnabled: false,
  post: {
    content: ''
  },
  author: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, { type, payload }) {
  switch(type) {
    case ENABLE_POST_FORM:
      if (payload.post && payload.post.id) { // implies a post was passed in
        return {
          ...state,
          isEnabled: true,
          post: payload.post
        };
      } else { // imples a new post is being created
        return {
          ...state,
          isEnabled: true,
          author: payload.author
        };
      }

    case DISABLE_POST_FORM:
      return {
        ...state,
        isEnabled: false,
        post: {
          content: ''
        },
        author: {}
      };

    case UPDATE_POST_FORM:
      const updatedPost = {...state.post};
      updatedPost.content = payload;
      
      return {
        ...state,
        post: updatedPost
      };
      
    default:
      return state;
  }
}