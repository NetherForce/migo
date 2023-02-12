import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMeetup } from '../../actions/meetup';
import SportsAutocomplete from '../sports/SportsAutocomplete';
import { Link } from 'react-router-dom';

const initialState = {
  text: '',
  availability: '',
  location: '',
  sport: ''
};

const MeetupForm = ({ addMeetup, sports }) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    addMeetup({ ...formData, sport: formData.sport.id });
    setFormData('');
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Create Meetup</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Give some information for your meetup
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="meetup-form">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Description"
            value={formData.text || ''}
            onChange={onChange}
            required
          />
          <small className="form-text">What is your meetup about</small>
        </div>
        <div className="autocomplete form-group">
          <SportsAutocomplete
            options={options}
            value={formData.sport}
            onChange={onSportChange}
            label="Sport"
          />
          <small className="form-text">Which sport do you want to do</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Availability"
            name="availability"
            value={formData.availability || ''}
            onChange={onChange}
          />
          <small className="form-text">
            Say when you have time to do the sport
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location || ''}
            onChange={onChange}
          />
          <small className="form-text">City and name of the place</small>
        </div>

        <button
          type="submit"
          className="btn btn-primary my-1"
          onClick={onSubmit}
        >
          Submit
        </button>
        <Link className="btn btn-light my-1" to="/meetups">
          Go Back
        </Link>
      </form>
    </section>
  );
};

MeetupForm.propTypes = {
  sports: PropTypes.object,
  addMeetup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  sports: state.staticData.sports
});

export default connect(mapStateToProps, { addMeetup })(MeetupForm);