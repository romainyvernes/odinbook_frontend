import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

// stylesheet
import '../styles/Navbar.css';

// icons
import { IoHomeOutline } from 'react-icons/io5';
import { IoHomeSharp } from 'react-icons/io5';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoPeopleSharp } from 'react-icons/io5';

// bootstrap components
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar({ logout, history, auth }) {
  const onLogoutClick = () => {
    logout(history);
  }; 
  
  return (
    <nav className="nav-bar">
      <div>
        <Link to="/">Site icon</Link>
      </div>

      <div className="navigation-links">
        <NavLink exact to={`/${auth.user.username}`} 
                activeClassName="selected" 
                className="nav-link">
          Profile
        </NavLink>
        <NavLink exact to="/" activeClassName="selected" className="nav-link">
          <IoHomeOutline className="icon outline" />
          <IoHomeSharp className="icon filled" />
        </NavLink>
        <NavLink exact to="/friends" activeClassName="selected" className="nav-link">
          <IoPeopleOutline className="icon outline" />
          <IoPeopleSharp className="icon filled" />
        </NavLink>
      </div>
      
      <Dropdown>
        <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
        
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href={`/${auth.user.username}`}>
            <h2>{auth.user.name}</h2>
            <p>See your profile</p>
          </Dropdown.Item>
          <Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
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
