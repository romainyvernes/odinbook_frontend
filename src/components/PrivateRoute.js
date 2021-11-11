import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// use unique IDs to force re-renders of components every time navigation links
// are clicked
import { v4 as uuid } from 'uuid';

// template component for all components for which authentication should be
// verified prior to rendering
function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (auth.isAuthenticated) {
        return <Component {...props} key={uuid()} />
      }
      return <Redirect to="/" />
    }} />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PrivateRoute);

