import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//stylesheets
import '../styles/Sidebar.css';

function Sidebar({ auth }) {
  return (
    <aside className="sidebar">
      <ul>
        <li className="hovered-link">
          <Link to={`/${auth.user.username}`}>
            <h6>{auth.user.name}</h6>
          </Link>
        </li>
        <li className="hovered-link">
          <Link to="/friends">
            <h6>Friends</h6>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
