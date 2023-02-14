import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import Map, { Marker, Popup, Image } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { color } from '@mui/system';
import { red } from '@mui/material/colors';

const MapPopup = ({
  sports,
  currentPlaceId,
  setCurrentPlaceId,
  post: { _id, user, text, name, avatar, location, availability, sport }
}) => {
  //const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <>
      <Marker
        longitude={location.longitude}
        latitude={location.latitude}
        anchor="bottom"
        onClick={() => handleMarkerClick(_id)}
        style={{ cursor: 'pointer', zIndex: '1000' }}
      ></Marker>
      {_id === currentPlaceId && (
        <Popup
          longitude={location.longitude}
          latitude={location.latitude}
          closeOnClick={false}
          closeButton={true}
          anchor="top"
          onClose={() => setCurrentPlaceId(null)}
        >
          <>
            <details className="unselectable">
              <summary>{sports[sport].name}</summary>

              <label>{availability}</label>
              <br></br>
              <label>Created by {name}</label>
              <br></br>
            </details>
            <Link className="unselectable" to={`/posts/${_id}`}>
              Go to post
            </Link>
          </>
        </Popup>
      )}
    </>
  );
};

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
