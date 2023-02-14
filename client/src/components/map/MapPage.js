import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getPosts } from '../../actions/post';
import MapPopup from './MapPopup';

const MapPage = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, []);

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  return (
    <Map
      initialViewState={{
        longitude: 23.3219,
        latitude: 42.6977,
        zoom: 12
      }}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        marginTop: '60px',
        cursor: 'point'
      }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken="pk.eyJ1IjoicGFuY2FrZWJveSIsImEiOiJjbGUyajU0dncxbXo3M3BwNmdkYXNwZzdlIn0.v1N4CI0aULZ7M6S12iW5Kg"
    >
      {posts.map((post) => {
        return (
          <MapPopup
            key={post._id}
            post={post}
            currentPlaceId={currentPlaceId}
            setCurrentPlaceId={setCurrentPlaceId}
          />
        );
      })}
    </Map>
  );
};

MapPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(MapPage);
