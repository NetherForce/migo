import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import SportsAutocomplete from '../sports/SportsAutocomplete';

const AddExperience = ({ addExperience, sports }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    expLevel: 'BEGINNER',
    location: '',
    club: '',
    from: '',
    to: '',
    main: false,
    description: ''
  });
  
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

  const onSportChange = (newValue) => {
    setFormData({ ...formData, "sport": newValue });
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Add Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, navigate);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="autocomplete form-group">
          <SportsAutocomplete
            options={options}
            value={formData.sport}
            onChange = {onSportChange}
            label="Sport"
          />
          <small className="form-text">Which sport do you want to do</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={formData.from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="main"
              checked={formData.main}
              value={formData.main}
              onChange={() => {
                setFormData({ ...formData, main: !formData.main });
              }}
            />{' '}
            Main Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={formData.description}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  sports: PropTypes.object
};

const mapStateToProps = (state) => ({
  sports: state.staticData.sports
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
