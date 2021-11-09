import { 
  GET_COMMENTS, 
  ADD_COMMENT, 
  DELETE_COMMENT, 
  UPDATE_COMMENT,
  ADD_COMMENT_REACTION,
  DELETE_COMMENT_REACTION
} from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, { type, payload }) {
  switch(type) {
    case GET_COMMENTS:
      return payload;
    
    case ADD_COMMENT:
      const newComment = payload;

      // add new comment to its parent comment when it is a reply to a comment
      if (newComment.post_id !== newComment.parent_id) {
        return {
          ...state,
          [newComment.post_id]: state[newComment.post_id].reduce(
            (newArr, comment, index, currentArr) => {
              // look for the new comment's parent comment and add it to
              // parent's replies
              if (comment.id === newComment.parent_id) {
                comment.replies.push(newComment);
              }

              newArr.push(comment);

              // when the loop is reaching the last item, insert the new
              // comment at the end
              if (index === currentArr.length - 1) {
                newArr.push(newComment);
              }
              
              return newArr;
            }, 
            []
          )
        };
      }

      // otherwise, simply add the new comment to the existing array of comments
      return {
        ...state,
        [newComment.post_id]: [...state[newComment.post_id], newComment]
      };
    
    case DELETE_COMMENT:
      const deletedComment = payload;

      // remove deleted comment from its parent comment's replies if it is a 
      // reply to a comment
      if (deletedComment.post_id !== deletedComment.parent_id) {
        return {
          ...state,
          [deletedComment.post_id]: state[deletedComment.post_id].reduce(
            (newArr, comment) => {
              // save only comments that are not the deleted comment
              if (comment.id !== deletedComment.id) {
                newArr.push(comment);
              }

              // look for the deleted comment's parent comment and remove it
              // from the parent comment's replies array
              if (comment.id === deletedComment.parent_id) {
                comment.replies = comment.replies.filter((comment) => (
                  comment.id !== deletedComment.id
                ));
              }
              
              return newArr;
            }, 
            []
          )
        };
      }

      // otherwise, only save comments that aren't the deleted comment
      return {
        ...state,
        [deletedComment.post_id]: state[deletedComment.post_id].filter(
          (comment) => comment.id !== deletedComment.id
        )
      };

    case UPDATE_COMMENT:
      const updatedComment = payload;
      return {
        ...state,
        [updatedComment.post_id]: state[updatedComment.post_id].map(
          (comment) => {
            if (comment.id === updatedComment.id) {
              comment.content = updatedComment.content;
            }
            return comment;
          }
        )
      };
    
    case ADD_COMMENT_REACTION:
      const { comment, reaction } = payload;
      return {
        ...state,
        [comment.post_id]: state[comment.post_id].map(
          (item) => {
            if (item.id === comment.id) {
              item.reactions.push(reaction);
            }
            return item;
          }
        )
      };

    case DELETE_COMMENT_REACTION:
      return {
        ...state,
        [payload.comment.post_id]: state[payload.comment.post_id].map(
          (item) => {
            if (item.id === payload.comment.id) {
              item.reactions = item.reactions.filter((element) => (
                element._id !== payload.reaction._id
              ));
            }
            return item;
          }
        )
      };

    default:
      return state;
  }
}