import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import SportsAutocomplete from '../sports/SportsAutocomplete';

const initialState = {
  text: '',
  availability: '',
  location: '',
  sport: '',
};

const PostForm = ({
  addPost
}) => {
  const [formData, setFormData] = useState(initialState);

  // const navigate = useNavigate();

  const {
    text,
    availability,
    location,
    sport,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text, availability, sport, location });
    setFormData('');
  };

  return (
    <section className="container">
      <p className="lead">
        <i className="fas fa-user" />
        Give some information for your post
      </p>
      <form className="form" onSubmit={onSubmit}>
      <div className='post-form'>
            <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder="Description"
            value={text}
            onChange={onChange}
            required
            />
            <small className="form-text">
                What is your post about
          </small>
        </div>
        <div className="autocomplete form-group">
          <SportsAutocomplete sportChanged={(sportId)=>setFormData({ ...formData, ["sport"]: sportId })} />
          <small className="form-text">
            Which sport do you want to do
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Availability"
            name="availability"
            value={availability}
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
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City and name of the place
          </small>
        </div>

        <button type="submit" className="btn btn-primary my-1"  onClick={onSubmit}>submit</button>
      </form>
    </section>
  );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
  };

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { addPost })(PostForm);
