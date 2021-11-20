import { mapArrayToObject } from '../utils/reduxMiddleware';
import { 
  GET_FRIENDS,
} from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, { type, payload }) {
  switch(type) {
    case GET_FRIENDS:
      const friendsObj = mapArrayToObject(payload);
      return friendsObj;
    
    default:
      return state;
  }
}