import React from "react";
import axios from 'axios';

const Profile = ({ username }) => {
  axios.get(`/api/users/${username}`).then((response) => {
    
  }).catch((err) => {
    
  });

  return (
    <div></div>
  );
};

export default Profile;