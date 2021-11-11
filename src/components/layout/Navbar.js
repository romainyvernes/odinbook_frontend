import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

function Navbar({ logout, history, auth }) {
  const onLogoutClick = () => {
    logout(history);
  }; 
  
  return (
    <div>
      <nav>
        <Link to={`/${auth.user.username}`}>Profile</Link>
        <Link to="/">Home</Link>
        <Link to="/friends">Friends</Link>
        <button onClick={onLogoutClick}>Logout</button>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
