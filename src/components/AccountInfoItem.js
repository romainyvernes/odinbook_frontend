/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// redux actions
import { deleteAccount, updateAccount } from '../actions/authActions';

// stylesheet
import '../styles/AccountInfoItem.css';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AccountInfoItem({ 
  heading, 
  content, 
  btnLabel,
  deleteAccount,
  auth,
  updateAccount,
  errors,
  userData,
}) {
  const [showForm, setShowForm] = useState(false);
  const [formInput, setFormInput] = useState({});

  // update object in local state based on the type of content passed in
  useEffect(() => {
    switch (heading) {
      case "Name":
        setFormInput(content);
        break;
      case "Email address":
        setFormInput({ email: content });
        break;
      case "Password":
        setFormInput({ password: content });
        break;
      default:
        return;
    }
  }, []);

  const onInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    });
  };

  const toggleFormDisplay = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    updateAccount(formInput, auth.user.username);
    
    // close form only if previous update did not generate an error
    if (JSON.stringify(errors) === '{}') {
      toggleFormDisplay();
    }
  };

  const renderFormContent = () => {
    switch (heading) {
      case "Name":
        return (
          <>
            <label className="secondary-font-color light-bold">
              <span>First</span>
              <Form.Control type="text"
                            placeholder="First name"
                            name="firstName"
                            value={formInput.firstName}
                            onChange={onInputChange}
                            isInvalid={errors?.data?.firstName} />
              <Form.Control.Feedback type="invalid">
                {errors?.data?.firstName?.msg}
              </Form.Control.Feedback>
            </label>
            <label className="secondary-font-color light-bold">
              <span>Last</span>
              <Form.Control type="text" 
                    placeholder="Last name"
                    name="lastName"
                    value={formInput.lastName}
                    onChange={onInputChange}
                    isInvalid={errors?.data?.lastName} />
              <Form.Control.Feedback type="invalid">
                {errors?.data?.lastName?.msg}
              </Form.Control.Feedback>
            </label>
            <div className="validation">
              <Button onClick={handleFormSubmit}>Submit</Button>
              <Button variant="secondary" onClick={toggleFormDisplay}>
                Cancel
              </Button>
            </div>
          </>
        );

      case "Email address":
        return (
          <>
            <Form.Control type="email" 
                    placeholder="Email address"
                    name="email"
                    value={formInput.email}
                    onChange={onInputChange}
                    isInvalid={errors?.data?.email} />
            <Form.Control.Feedback type="invalid">
              {errors?.data?.email?.msg}
            </Form.Control.Feedback>
            <div className="validation">
              <Button onClick={handleFormSubmit}>Submit</Button>
              <Button variant="secondary" onClick={toggleFormDisplay}>
                Cancel
              </Button>
            </div>
          </>
        );

      case "Password":
        return (
          <>
            <Form.Control type="text" 
                    placeholder="Password"
                    name="password"
                    value={formInput.password}
                    onChange={onInputChange}
                    isInvalid={errors?.data?.password} />
            <Form.Control.Feedback type="invalid">
              {errors?.data?.password?.msg}
            </Form.Control.Feedback>
            <div className="validation">
              <Button onClick={handleFormSubmit}>Submit</Button>
              <Button variant="secondary" onClick={toggleFormDisplay}>
                Cancel
              </Button>
            </div>
          </>
        );

      case "Account management":
        return (
          <>
            <p>Are you sure you want to delete your account?</p>
            <div className="validation">
              <Button variant="danger" onClick={() => {
                deleteAccount(auth.user.username);
              }}>
                Delete my account
              </Button>
              <Button variant="secondary" onClick={toggleFormDisplay}>
                Cancel
              </Button>
            </div>
          </>
        );

      default:
        return (
          <>
          </>
        );
    }
  };
  
  return (
    <li className="account-info-item">
      {
        showForm
          ? <form className="sub-wrapper secondary-bg-color">
              <h3>{heading}</h3>
              <Form.Group className={
                `content ${
                  heading === 'Account management' 
                    ? 'account-management' 
                    : ''
                }`
              }>
                {renderFormContent()}
              </Form.Group>
            </form>
          : <div className="info-display sub-wrapper hovered-link" 
                  onClick={toggleFormDisplay}>
              <h3>{heading}</h3>
              <p className="content">
                {formInput[Object.keys(formInput)[0]] || ""}
              </p>
              <button className="primary-font-color expand-btn">
                {btnLabel}
              </button>
            </div>
      }
    </li>
  )
}

AccountInfoItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

const mapDispatchToProps = {
  updateAccount,
  deleteAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoItem);