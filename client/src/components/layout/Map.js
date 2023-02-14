import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapPage = ({ isAuthenticated }) => {
  const [showPopup, setShowPopup] = React.useState(true);

  return (
    <Map
      initialViewState={{
        longitude: 23.3219,
        latitude: 42.6977,
        zoom: 12
      }}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken="pk.eyJ1IjoicGFuY2FrZWJveSIsImEiOiJjbGUyajU0dncxbXo3M3BwNmdkYXNwZzdlIn0.v1N4CI0aULZ7M6S12iW5Kg"
    >
      <Marker longitude={23.3219} latitude={42.6977}></Marker>
      {showPopup && (
        <Popup
          longitude={23.3219}
          latitude={42.6977}
          closeOnClick={false}
          anchor="top"
          onClose={() => setShowPopup(false)}
        >
          <Link to="/">MIGO</Link>
        </Popup>
      )}
    </Map>
  );
};

MapPage.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MapPage);
