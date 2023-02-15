import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import SportsAutocomplete from '../sports/SportsAutocomplete';
import { Link } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const initialState = {
  text: '',
  availability: '',
  location: { longitude: '', latitude: '' },
  sport: ''
};

const PostForm = ({ addPost, sports }) => {
  const [formData, setFormData] = useState(initialState);

  const options = sports
    ? Object.keys(sports).map((key) => {
        return { ...sports[key], id: key, key: key };
      })
    : [];
  options.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  let i = 0;
  while (i < options.length - 1) {
    if (options[i].name === options[i + 1].name) {
      options.splice(i + 1, 1);
    } else {
      i++;
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSportChange = (newValue) => {
    setFormData({ ...formData, sport: newValue });
  };

  const onLocationChange = (e) => {
    setFormData({
      ...formData,
      location: { ...currentLocation, [e.target.name]: e.target.value }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ ...formData, sport: formData.sport.id });
    setFormData('');
  };

  const [currentLocation, setCurrentLocation] = useState(null);

  const handleAddClick = (e) => {
    setCurrentLocation({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng
    });
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Create Post</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Give some information for your post
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="post-form">
          <small className="form-text">What is your post about</small>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Description"
            value={formData.text || ''}
            onChange={onChange}
            required
          />
        </div>
        <div className="autocomplete form-group">
          <small className="form-text">Which sport do you want to do</small>
          <div style={{ marginTop: '-15px' }}>
            <SportsAutocomplete
              options={options}
              value={formData.sport}
              onChange={onSportChange}
              label="Sport"
            />
          </div>
        </div>
        <div className="form-group">
          <small className="form-text">
            Say when you have time to do the sport
          </small>
          <input
            type="text"
            placeholder="Availability"
            name="availability"
            value={formData.availability || ''}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Location</small>
          <div>
            <Map
              initialViewState={{
                longitude: 23.3219,
                latitude: 42.6977,
                zoom: 7
              }}
              style={{
                width: '70vw',
                height: '40vh',
                overflow: 'hidden'
              }}
              mapStyle="mapbox://styles/mapbox/outdoors-v12"
              mapboxAccessToken="pk.eyJ1IjoicGFuY2FrZWJveSIsImEiOiJjbGUyajU0dncxbXo3M3BwNmdkYXNwZzdlIn0.v1N4CI0aULZ7M6S12iW5Kg"
              cursor="auto"
              onClick={handleAddClick}
            >
              {currentLocation && (
                <Marker
                  longitude={currentLocation.longitude}
                  latitude={currentLocation.latitude}
                  style={{ cursor: 'auto' }}
                ></Marker>
              )}
            </Map>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="longitude"
            value={
              currentLocation
                ? currentLocation.longitude || 'Latitude'
                : 'Longitude (read-only)'
            }
            disabled
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="latitude"
            value={
              currentLocation
                ? currentLocation.latitude || 'Latitude'
                : 'Latitude (read-only)'
            }
            disabled
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary my-1"
          onClick={(onSubmit, onLocationChange)}
        >
          Submit
        </button>
        <Link className="btn btn-light my-1" to="/posts">
          Go Back
        </Link>
      </form>
    </section>
  );
};

PostForm.propTypes = {
  sports: PropTypes.object,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  sports: state.staticData.sports
});

export default connect(mapStateToProps, { addPost })(PostForm);
