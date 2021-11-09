import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// template component for all buttons that should only be visible to the
// account's owner
function PrivateButton({ auth, parentElement, label, dispatch, ...rest }) {
  if (
    auth.user.id === parentElement.author.id
    || auth.user.id === parentElement.destination_profile
  ) {
    return (
      <button {...rest}>{label}</button>
    );
  } else {
    return null;
  }
}

PrivateButton.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PrivateButton);

