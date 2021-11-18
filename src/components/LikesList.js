import React from 'react'
import { Link } from 'react-router-dom'

export default function LikesList({ data }) {
  return (
    <div className="overlay">
      <div className="primary-frame">
        <header>
          <button></button>
          <button></button>
        </header>
        <ul>
          {
            data.reactions.map((reaction) => (
              <li key={reaction._id}>
                <Link to={`/${reaction.author.username}`}>
                  <h3>{reaction.author.name}</h3>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
