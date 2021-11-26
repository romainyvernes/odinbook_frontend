import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// redux actions
import { deleteAccount, updateAccount } from '../actions/authActions';

// stylesheet
import '../styles/AccountInfoItem.css';

// bootstrap components
import Button from 'react-bootstrap/Button';

function AccountInfoItem({ 
  heading, 
  content, 
  btnLabel,
  deleteAccount,
  auth,
  updateAccount,
}) {
  const [showForm, setShowForm] = useState(false);
  const [formInput, setFormInput] = useState(content);

  useEffect(() => {
    switch(heading) {
      
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

    const body = {
      ...formInput
    };

    updateAccount(body, auth.user.username);
    
    toggleFormDisplay();
  };

  const renderFormContent = () => {
    switch (heading) {
      case "Name":
        return (
          <>
            <label className="secondary-font-color light-bold">
              First 
              <input type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formInput.firstName}
                    onChange={onInputChange}
                    required />
            </label>
            <label className="secondary-font-color light-bold">
              Last
              <input type="text" 
                    placeholder="Last name"
                    name="lastName"
                    value={formInput.lastName}
                    onChange={onInputChange}
                    required />
            </label>
            <div className="validation">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={toggleFormDisplay}>
                Cancel
              </Button>
            </div>
          </>
        );

      case "Username":
        setFormInput({
          username: content
        });

        return (
          <>
            <input type="text" 
                    placeholder="Username"
                    value={formInput}
                    onChange={onInputChange}
                    required />
            <div className="validation">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={toggleFormDisplay}>
                Cancel
              </Button>
            </div>
          </>
        );

      case "Email address":
        setFormInput({
          email: content
        });

        return (
          <>
            <input type="email" 
                    placeholder="Email address"
                    value={formInput}
                    onChange={onInputChange}
                    required />
            <div className="validation">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={toggleFormDisplay}>
                Cancel
              </Button>
            </div>
          </>
        );

      case "Password":
        setFormInput({
          password: content
        });

        return (
          <>
            <input type="text" 
                    placeholder="Password"
                    value={formInput}
                    onChange={onInputChange}
                    required />
            <div className="validation">
              <Button type="submit">Submit</Button>
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
          ? <form onSubmit={handleFormSubmit}
                  className="sub-wrapper secondary-bg-color">
              <h3>{heading}</h3>
              <div className="content">
                {renderFormContent()}
              </div>
            </form>
          : <div className="info-display sub-wrapper hovered-link" 
                  onClick={toggleFormDisplay}>
              <h3>{heading}</h3>
              <p className="content">{content.name || content}</p>
              <button className="primary-font-color">{btnLabel}</button>
            </div>
      }
    </li>
  )
}

AccountInfoItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {
  updateAccount,
  deleteAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoItem);