import React from 'react';
import { Link } from 'react-router-dom';

// stylesheet
import '../styles/ProfileFriends.css';

// components
import DropdownMenu from './DropdownMenu';

export default function ProfileFriends({ friends }) {
  const dropdownItems = [
    {
      label: "Unfriend",
      function: ""
    }
  ];
  
  return (
    <section className="profile-friends primary-frame primary-bg-color">
      <header>
        <h2>Friends</h2>
      </header>
      {
        friends.length > 0
          ? <ul>
              {
                friends.map((friend) => (
                  <li key={friend.id}>
                    <Link to={`/${friend.username}`}>
                      {friend.name}
                    </Link>
                    <DropdownMenu items={dropdownItems} />
                  </li>
                ))
              }
            </ul>
          : <p className="no-data-msg">There is no one here.</p>
      }
    </section>
  )
}
