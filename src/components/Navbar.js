import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

// icons
import { IoHomeOutline } from 'react-icons/io5';
import { IoHomeSharp } from 'react-icons/io5';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoPeopleSharp } from 'react-icons/io5';

// bootstrap components
import Dropdown from 'react-bootstrap/Dropdown';

// stylesheet
import '../styles/Navbar.css';

function Navbar({ logout, history, auth }) {
  const onLogoutClick = () => {
    logout(history);
  }; 
  
  return (
    <nav className="nav-bar">
      <div>
        <Link to="/">Site icon</Link>
      </div>

      <ul className="navigation-links">
        <li>
          <NavLink exact to="/" activeClassName="selected" className="nav-link hovered-link">
            <IoHomeOutline className="icon outline" />
            <IoHomeSharp className="icon filled" />
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/friends" activeClassName="selected" className="nav-link hovered-link">
            <IoPeopleOutline className="icon outline" />
            <IoPeopleSharp className="icon filled" />
          </NavLink>
        </li>
      </ul>
      
      <div className="navigation-buttons">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" className="nav-button"></Dropdown.Toggle>
          
          <Dropdown.Menu variant="light">
            <ul>
              <li>
                <Dropdown.Item href={`/${auth.user.username}`} className="hovered-link">
                  <h2>{auth.user.name}</h2>
                  <p>See your profile</p>
                </Dropdown.Item>
                <hr/>
              </li>
              <li>
                <Dropdown.Item onClick={onLogoutClick} className="hovered-link">
                  <h6>Log out</h6>
                </Dropdown.Item>
              </li>
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
