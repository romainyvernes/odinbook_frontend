import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from './actions/authActions';
import PropTypes from 'prop-types';

function Login({ auth, errors, login, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // check whether user appears as logged in when component is mounted
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      email,
      password
    };

    login(body);
  };

  // TODO: handle errors passed in from props.errors

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" 
               name="email" 
               value={email} 
               onChange={onChange}></input>
        <input type="text" 
               name="password"
               value={password}
               onChange={onChange}></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { login })(withRouter(Login));