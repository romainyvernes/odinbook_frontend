import { mapArrayToObject } from '../utils/reduxMiddleware';
import { 
  SEND_FRIEND_REQUEST, 
  USER_LOGIN, 
  USER_LOGOUT,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, { type, payload }) {
  switch(type) {
    case USER_LOGIN:
      const authenticatedUser = {...payload};

      authenticatedUser.incomingFriendRequests = mapArrayToObject(
        authenticatedUser.incomingFriendRequests
      );

      authenticatedUser.outgoingFriendRequests = mapArrayToObject(
        authenticatedUser.outgoingFriendRequests
      );
      
      return {
        ...state,
        isAuthenticated: payload.username ? true : false,
        user: authenticatedUser
      };

    case USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };

    case SEND_FRIEND_REQUEST:
      const newObj = {};
      newObj[payload.id] = payload;
      
      return {
        ...state,
        user: {
          ...state.user,
          outgoingFriendRequests: {
            ...state.user.outgoingFriendRequests,
            ...newObj
          }
        }
      }

    default:
      return state;
  }
}