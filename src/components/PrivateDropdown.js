import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// stylesheets
import '../styles/PrivateDropdown.css';

// bootstrap components
import Dropdown from 'react-bootstrap/Dropdown';

// icons
import { BsThreeDots } from 'react-icons/bs';

function PrivateDropdown({ auth, data, handleDelete, handleUpdate }) {
  if (
       auth.user.id === data.author.id 
    || auth.user.id === data.destination_profile
  ) {
    return (
      <Dropdown className="private-dropdown secondary-font-color">
        <Dropdown.Toggle>
          <BsThreeDots className="more-btn secondary-bg-color-hover" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <ul>
            <li>
              <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
            </li>
            <li>
              <Dropdown.Item onClick={handleUpdate}>Update</Dropdown.Item>
            </li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return null;
  }
}

PrivateDropdown.propTypes = {
  auth: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateDropdown);
