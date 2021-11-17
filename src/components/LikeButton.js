import React from 'react';

// stylesheets
import '../styles/LikeButton.css';

// icons
import { FaThumbsUp } from 'react-icons/fa';

export default function LikeButton({ data }) {
  return (
    <button className="like-button">
      <i className="primary-font-color"><FaThumbsUp /></i>
      <span className="secondary-font-color"> {data.reactions.length}</span>
    </button>
  )
}
