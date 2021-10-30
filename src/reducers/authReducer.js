import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: action.payload.username ? true : false,
        user: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}