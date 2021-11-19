import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// stylesheets
import '../styles/LikeButton.css';

// icons
import { FaThumbsUp } from 'react-icons/fa';

// redux actions
import { enableReactionsList } from '../actions/overlaysActions';

function LikeButton({ data, enableReactionsList }) {
  const reactions = useRef(data.reactions);
  
  const displayReactionsList = () => {
    enableReactionsList(reactions.current);
  };
  
  return (
    <button className="like-button" onClick={displayReactionsList}>
      <i className="primary-font-color"><FaThumbsUp /></i>
      <span className="secondary-font-color"> {data.reactions.length}</span>
    </button>
  )
}

LikeButton.propTypes = {
  enableReactionsList: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(null, { enableReactionsList })(LikeButton);
