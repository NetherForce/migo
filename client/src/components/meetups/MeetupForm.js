import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Button } from '@mui/material';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MeetupItem from './MeetupItem';
import PostItem from '../posts/PostItem';
import { getMeetups, addMeetup } from '../../actions/meetup';
import { getPost } from '../../actions/post';
import { createChat } from '../../actions/chat';

const Post = ({ getMeetups, addMeetup, createChat, meetup: { meetups }, getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getMeetups();
    getPost(id);
  }, [getMeetups, getPost, id]);

  const [date, setDate] = useState('');

  const onClick = async () => {
    const chatId = await createChat([post.user], "lol");
    addMeetup({...post, date: date, location: "", chatId: chatId});
  }

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />

      <section className="container">
    <DatePicker
      selected={date}
      onChange={(newDate) => setDate(newDate)}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
    />

        <button className="btn btn-primary" onClick={onClick}>Create meet</button>
      </section>

      <div className="comments">
        {meetups.map((meetup) => (
          <MeetupItem key={meetup._id} meetup={meetup} />
        ))}
      </div>
    </section>
  );
};

Post.propTypes = {
  getMeetups: PropTypes.func.isRequired,
  meetup: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addMeetup: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  meetup: state.meetup,
  post: state.post
});

export default connect(mapStateToProps, { getMeetups, getPost, addMeetup, createChat })(Post);
