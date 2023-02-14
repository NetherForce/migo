import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import Map, { Marker, Popup } from 'react-map-gl';

const MapPopup = ({
  post: { _id, text, name, avatar, location, availability, sport },
  showActions
}) => (
  <Popup
    longitude={location.longitude}
    latitude={location.latitude}
    closeOnClick={false}
    anchor="top"
    onClose={() => setShowPopup(false)}
  >
    <div>
      <label>${sport}</label>
      <label>${availability}</label>
      <label>Created by ${name}</label>
      <Link to={`/posts/${_id}`}>Go to post</Link>
    </div>
  </Popup>
);

MapPopup.defaultProps = {
  showActions: true
};

MapPopup.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sports: state.staticData.sports
});

export default connect(mapStateToProps)(MapPopup);
