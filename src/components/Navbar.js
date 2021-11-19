import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

// icons
import { 
  IoHomeOutline, 
  IoHomeSharp, 
  IoPeopleOutline, 
  IoPeopleSharp,
  IoLogOut
} from 'react-icons/io5';


// bootstrap components
import Dropdown from 'react-bootstrap/Dropdown';

// stylesheet
import '../styles/Navbar.css';

function Navbar({ logout, history, auth }) {
  const onLogoutClick = () => {
    logout(history);
  }; 
  
  return (
    <nav className="nav-bar primary-bg-color quinary-frame">
      <div className="search">
        <i>
          <Link to="/">Site icon</Link>
        </i>
      </div>

      <ul className="navigation-links">
        <li>
          <NavLink exact to="/" activeClassName="selected" className="nav-link hovered-link">
            <i className="icon outline"><IoHomeOutline /></i>
            <i className="icon filled"><IoHomeSharp /></i>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/friends" activeClassName="selected" className="nav-link hovered-link">
            <i className="icon outline"><IoPeopleOutline /></i>
            <i className="icon filled"><IoPeopleSharp /></i>
          </NavLink>
        </li>
      </ul>
      
      <div className="navigation-buttons">
        <Dropdown>
          <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
          
          <Dropdown.Menu variant="light">
            <ul>
              <li>
                <Dropdown.Item href={`/${auth.user.username}`} className="hovered-link">
                  <h2>{auth.user.name}</h2>
                  <p className="secondary-font-color">See your profile</p>
                </Dropdown.Item>
                <hr className="secondary-font-color" />
              </li>
              <li>
                <Dropdown.Item onClick={onLogoutClick} className="logout-btn hovered-link">
                  <i><IoLogOut /></i>
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
