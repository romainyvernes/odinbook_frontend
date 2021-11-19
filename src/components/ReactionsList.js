import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// bootstrap components
import Modal from 'react-bootstrap/Modal';

function ReactionsList({ overlays }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title as={"h2"}>Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body as={'ul'}>
        {
          overlays.reactionsList.reactions.map((reaction) => (
            <li key={reaction._id}>
              <Link to={`/${reaction.author.username}`}>
                <h3>{reaction.author.name}</h3>
              </Link>
            </li>
          ))
        }
      </Modal.Body>
    </>
  )
}

ReactionsList.propTypes = {
  overlays: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  overlays: state.overlays
});

export default connect(mapStateToProps)(ReactionsList);
