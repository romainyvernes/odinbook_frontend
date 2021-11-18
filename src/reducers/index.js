import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import overlaysReducer from "./overlaysReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer,
  comments: commentReducer,
  overlays: overlaysReducer
});