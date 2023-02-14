import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getPosts } from '../../actions/post';

const MapPage = ({ getPosts, post: { posts } }) => {
  const [showPopup, setShowPopup] = React.useState(true);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
      {/* {posts.map((post) => (
        <MapMarker key={post._id} post={post} />
      ))} */}
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
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(MapPage);
