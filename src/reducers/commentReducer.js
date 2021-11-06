import { GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, { type, payload }) {
  switch(type) {
    case GET_COMMENTS:
      return payload;
    case ADD_COMMENT:
      const newComment = payload;
      return {
        ...state,
        [newComment.post_id]: [...state[newComment.post_id], newComment]
      };
    case DELETE_COMMENT:
      const deletedComment = payload;  
      return {
        ...state,
        [deletedComment.post_id]: state[deletedComment.post_id].filter(
          (comment) => comment.id !== deletedComment.id
        )
      };
    default:
      return state;
  }
}