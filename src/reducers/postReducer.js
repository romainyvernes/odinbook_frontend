import { GET_POSTS } from "../actions/types";

const initialState = {
  items: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_POSTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}