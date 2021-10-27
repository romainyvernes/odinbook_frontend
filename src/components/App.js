import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

// stylesheet
import '../styles/App.css';

// components
import Profile from './Profile';
import Login from './auth/Login';
import Friends from './Friends';
import Newsfeed from './Newsfeed';
import Navbar from './layout/Navbar';

function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: null
  });

  const handleRegistration = () => {
    axios.post('/api/auth/register', {})
  };

  const handleAuthentication = () => {};

  const getUserProfile = () => {
    axios.get('')
  };

  const getFriends = () => {

  };
  
  return (
    <Router>
      <div className="App">
        {
          /* display navigation bar only if user is authenticated, as it doesn't
          appear on sign in page */
          user.isLoggedIn && <Navbar />
        }
        <Route exact path="/" component={() => {
          // display user's newsfeed only if authenticated
          if (user.isLoggedIn) return <Newsfeed />;
          return <Login />;
        }} />
        <Route exact path="/:username" component={(props) => {
          // pass in props to be able to access "match" property that contains
          // the URI's parameter
          <Profile {...props} />
        }} />
        <Route exact path="/friends" component={Friends} />
      </div>
    </Router>
  );
}

export default App;
