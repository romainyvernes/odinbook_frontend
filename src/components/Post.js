import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addReaction, deleteReaction } from '../actions/reactionActions';
import { deletePost } from '../actions/postActions';
import { enablePostForm } from '../actions/postFormActions';

// stylesheets
import '../styles/Post.css';

// icons
import { FiThumbsUp } from 'react-icons/fi';
import { IoMdThumbsUp } from 'react-icons/io';
import { VscComment } from 'react-icons/vsc';
import { FaThumbsUp } from 'react-icons/fa';

// components
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';
import PrivateDropdown from './PrivateDropdown';

function Post({ 
  data, 
  comments, 
  auth, 
  addReaction, 
  deleteReaction, 
  deletePost,
  posts,
  enablePostForm
}) {
  // NOTE: posts is only passed in as a prop to force re-render when a single
  // post is updated in redux store
  const post = useRef(data);
  const [isFocused, setIsFocused] = useState(false);

  const toggleLike = () => {
    // look for an existing reaction by authenticated user
    const currentReaction = data.reactions.find((reaction) => (
      reaction.author.id === auth.user.id
    ));
    
    if (currentReaction) {
      deleteReaction(currentReaction, post.current);
    } else {
      const body = {
        parentId: post.current.id,
        profileId: post.current.destination_profile.id,
        value: 'Like'
      };
      
      addReaction(body, post.current);
    }
  };

  const onCommentClick = () => {
    // when comment button is clicked, focus on comment input area
    setIsFocused(true);
  };

  const handleDeletePost = () => {
    deletePost(post.current);
  };

  const handleUpdatePost = () => {
    enablePostForm(post.current);
  };

  const disableAddCommentFocus = () => {
    setIsFocused(false);
  };
  
  return (
    <li className="post primary-frame primary-bg-color">
      <header>
        <div>
          <a href={`/${data.author.username}`} rel="author">
            <h3>{data.author.name}</h3>
          </a>
          <time dateTime={data.date} className="post-date secondary-font-color">{data.date}</time>
        </div>
        <PrivateDropdown data={data} 
                        handleDelete={handleDeletePost}
                        handleUpdate={handleUpdatePost} />
        
      </header>

      <p className="post-content">{data.content}</p>

      <div className="post-data secondary-font-color">
        {
          data.reactions.length > 0
            ? <button className="like-btn">
                <i className="primary-font-color"><FaThumbsUp /></i>
                <span> {data.reactions.length}</span>
              </button>
            : <div></div>
        }
        {
          comments[data.id] && comments[data.id].length > 0 && 
            <button>
              {`${comments[data.id].length} Comment${
                comments[data.id].length > 1 ? 's' : ''
              }`}
            </button>
        }
      </div>

      <div className="post-btns secondary-font-color light-bold">
        {
          data.reactions.find((reaction) => (
            reaction.author.id === auth.user.id
          ))
            ? <button onClick={toggleLike} className="primary-font-color post-btn hovered-link">
                <i><IoMdThumbsUp /></i>
                <span>Unlike</span>
              </button>
            : <button onClick={toggleLike} className="post-btn hovered-link">
                <i><FiThumbsUp /></i>
                <span>Like</span>
              </button>
        }
        <button onClick={onCommentClick} className="post-btn hovered-link">
          <i><VscComment /></i>
          <span>Comment</span>
        </button>
      </div>

      {
        // list of the post's comments
        comments[data.id] && comments[data.id].length > 0
          ? <CommentsList comments={comments[data.id].filter((comment) => (
            comment.parent_id === data.id
          ))} />
          : <p className="no-comment">Be the first to comment.</p>
      }

      <AddCommentForm type="comment" 
                      parentId={data.id} 
                      profileId={data.destination_profile.id}
                      postId={data.id}
                      isFocused={isFocused}
                      disableAddCommentFocus={disableAddCommentFocus} />
    </li>
  );
}

Post.propTypes = {
  comments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addReaction: PropTypes.func.isRequired,
  deleteReaction: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  enablePostForm: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  comments: state.comments,
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps, {
  addReaction,
  deleteReaction,
  deletePost,
  enablePostForm
})(Post);
