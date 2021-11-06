/* eslint-disable import/no-anonymous-default-export */
export default function(posts, comments) {
  // look for the ID of the comments' parent post
  const parentPost = posts.find((post) => post.id === comments[0].post_id);
  
  // object to store all comments by their id to facilitate lookup
  const commentsObj = {};

  // merge existing comments from parent post with new comments
  const mergedComments = parentPost.comments.concat(comments);

  // insert merged comments into comments object
  mergedComments.forEach((comment) => (
    commentsObj[comment.id] = comment
  ));

  mergedComments.forEach((comment) => {
    if (comment.parent_id !== parentPost.id) {
      const parentComment = commentsObj[comment.parent_id];
    }
  });
  /*
  [
    {
      post_id: '',
      comments: [
        {
          comment_id: '',
          replies: ['123', '345, '9883']
        }
      ]
    }
  ]
  */
}