import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from 'react-redux';
import { login } from './actions/authActions';
import PropTypes from 'prop-types';

function Login(props) {
  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: '',
      password: ''
    };

    props.login(body, history);
  };

  return (
    <div>
      <form>
        <input type="text" name="username"></input>
        <input type="text" name="password"></input>
      </form>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);