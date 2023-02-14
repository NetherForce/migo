import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map from 'react-map-gl';

const MapPage = ({ isAuthenticated }) => {
  return (
    <>
      <div style={{}}>
        <Map
          initialViewState={{
            longitude: 23.3219,
            latitude: 42.6977,
            zoom: 12
          }}
          style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken="pk.eyJ1IjoicGFuY2FrZWJveSIsImEiOiJjbGUyajU0dncxbXo3M3BwNmdkYXNwZzdlIn0.v1N4CI0aULZ7M6S12iW5Kg"
        />
      </div>
    </>
  );
};

MapPage.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MapPage);
