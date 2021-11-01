import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types';

function Register({ auth, errors, register, history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // check whether user appears as logged in when component is mounted
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'first-name':
        setFirstName(value);
        break;
      case 'last-name':
        setLastName(value);
        break;
      default:
        return;
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
      email,
      firstName,
      lastName
    };

    register(body, history);
  };

  // TODO: handle errors passed in from props.errors
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" 
               name="username"
               value={username}
               onChange={onChange}></input>
        <input type="text" 
               name="email" 
               value={email} 
               onChange={onChange}></input>
        <input type="text" 
               name="password"
               value={password}
               onChange={onChange}></input>
        <input type="text" 
               name="first-name"
               value={firstName}
               onChange={onChange}></input>
        <input type="text" 
               name="last-name"
               value={lastName}
               onChange={onChange}></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { register })(withRouter(Register));
