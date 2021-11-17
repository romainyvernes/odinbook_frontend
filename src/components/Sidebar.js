import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//stylesheets
import '../styles/Sidebar.css';

// icons
import { BsPersonCircle } from 'react-icons/bs';
import { IoPeopleCircleOutline } from 'react-icons/io5';

function Sidebar({ auth }) {
  return (
    <aside className="sidebar">
      <ul>
        <li className="hovered-link secondary-bg-color-hover">
          <Link to={`/${auth.user.username}`}>
            <i className="primary-font-color"><BsPersonCircle /></i>
            <h6>{auth.user.name}</h6>
          </Link>
        </li>
        <li className="hovered-link">
          <Link to="/friends">
            <i className="primary-font-color"><IoPeopleCircleOutline /></i>
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
