/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid';
import axios from 'axios';

// stylesheet
import '../styles/AccountInfo.css';

// redux action types
import { GET_ERRORS } from '../actions/types';

// react components
import AccountInfoItem from './AccountInfoItem'

function AccountInfo({ heading, auth, ...rest }) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    axios.get(`/api/users/${auth.user.username}?accountInfo=true`)
         .then((response) => {
            setUserInfo([
              {
                heading: "Name",
                content: {
                  name: response.data.name,
                  firstName: response.data.first_name,
                  lastName: response.data.last_name
                },
                btnLabel: "Edit"
              },
              {
                heading: "Email address",
                content: response.data.email,
                btnLabel: "Edit"
              },
              {
                heading: "Password",
                content: "",
                btnLabel: "Update"
              },
              {
                heading: "Account management",
                content: "",
                btnLabel: "View"
              },
            ]);

            setUserData(response.data);
         }).catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err
          });
        });
  }, []);
  
  return (
    <>
      <h2>{heading}</h2>
      <ul className="account-info-list">
        {
          userInfo.map((item) => (
            <AccountInfoItem heading={item.heading}
                              content={item.content}
                              btnLabel={item.btnLabel}
                              userData = {userData}
                              key={uuid()} />
          ))
        }
      </ul>
    </>
  )
}

AccountInfo.propTypes = {
  heading: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(AccountInfo)
