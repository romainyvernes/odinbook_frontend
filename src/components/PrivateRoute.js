import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (auth.isAuthenticated) {
        return <Component {...props} />
      }
      <Redirect to="/" />
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

