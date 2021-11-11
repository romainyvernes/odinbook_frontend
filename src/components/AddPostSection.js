import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { enablePostForm } from '../actions/postFormActions';

function AddPostSection({ user, auth, enablePostForm }) {
  /* NOTE: if user is undefined, it implies the component is being used from
  the Newsfeed page, meaning the profile where the post is added is the 
  authenticated user's */
  
  const handleAddPost = () => {
    enablePostForm(null, user || auth.user);
  };

  return (
    <section>
      <button onClick={handleAddPost}>
        {
          !user || auth.user.id === user.id
            ? `What's on your mind?`
            : `Write something to ${user.first_name}...`
        }
      </button>
    </section>
  )
}

AddPostSection.propTypes = {
  auth: PropTypes.object.isRequired,
  enablePostForm: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { enablePostForm })(AddPostSection);
