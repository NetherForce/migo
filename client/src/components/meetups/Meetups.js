import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MeetupItem from './MeetupItem.js';
import { getMyMeetups } from '../../actions/meetup';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

const Meetups = ({ getMyMeetups, meetup: { myMeetups } }) => {
  useEffect(() => {
    getMyMeetups();
  }, [getMyMeetups]);

  return (
    <section className="container">
      <h1 className="large text-primary">Meetups</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <div className="meetups">
        {myMeetups.map((meetup) => (
          <MeetupItem key={meetup._id} meetup={meetup} />
        ))}
      </div>
    </section>
  );
};

Meetups.propTypes = {
  getMyMeetups: PropTypes.func.isRequired,
  meetup: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  meetup: state.meetup
});

export default connect(mapStateToProps, { getMyMeetups })(Meetups);
