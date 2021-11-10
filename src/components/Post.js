import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addReaction, deleteReaction } from '../actions/reactionActions';
import { deletePost } from '../actions/postActions';

// components
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';
import PrivateButton from './PrivateButton';

function Post({ 
  data, 
  comments, 
  auth, 
  addReaction, 
  deleteReaction, 
  deletePost,
  posts
}) {
  const [post, setPost] = useState(data);
  const isFocused = useRef(false);

  const toggleLike = () => {
    // look for an existing reaction by authenticated user
    const currentReaction = data.reactions.find((reaction) => (
      reaction.author.id === auth.user.id
    ));
    
    if (currentReaction) {
      deleteReaction(currentReaction, post);
    } else {
      const body = {
        parentId: post.id,
        profileId: post.destination_profile,
        value: 'Like'
      };
      
      addReaction(body, post);
    }
  };

  const onCommentClick = () => {
    // when comment button is clicked, focus on comment input area
    isFocused.current = true;
  };

  const handleDeletePost = () => {
    deletePost(post);
  };

  const handleUpdatePost = () => {

  };
  
  return (
    <li className="post">
      <a href={`/${data.author.username}`} rel="author">{data.author.name}</a>
      <time dateTime={data.date}>{data.date}</time>
      <p>{data.content}</p>
      {
        data.reactions.length > 0 && 
          <div>
            {data.reactions.length}
          </div>
      }
      <div>
        <button onClick={toggleLike}>
          <i></i>
          <span>
            {
              data.reactions.find((reaction) => (
                reaction.author.id === auth.user.id
              ))
                ? 'Unlike'
                : 'Like'
            }
          </span>
        </button>
        <button onClick={onCommentClick}>
          <i></i>
          <span>Comment</span>
        </button>
        <PrivateButton onClick={handleDeletePost} 
                        parentElement={data}
                        label="Delete" />
        <PrivateButton onClick={handleUpdatePost} 
                        parentElement={data}
                        label="Update" />
      </div>
      {
        // list of the post's comments
        comments[data.id] && comments[data.id].length > 0
          ? <CommentsList comments={comments[data.id].filter((comment) => (
            comment.parent_id === data.id
          ))} />
          : "Be the first to comment."
      }
      <AddCommentForm type="comment" 
                      parentId={data.id} 
                      profileId={data.destination_profile}
                      postId={data.id}
                      isFocused />
    </li>
  );
}

Post.propTypes = {
  comments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addReaction: PropTypes.func.isRequired,
  deleteReaction: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  comments: state.comments,
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps, {
  addReaction,
  deleteReaction,
  deletePost
})(Post);
