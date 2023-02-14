import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MeetupItem from './MeetupItem';
import MeetupForm from './MeetupForm';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import { getMeetups } from '../../actions/meetup';
import { getPost } from '../../actions/post';

const Post = ({ getMeetups, meetup: { meetups }, getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getMeetups();
    getPost(id);
  }, [getMeetups, getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
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
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  meetup: state.meetup,
  post: state.post
});

export default connect(mapStateToProps, { getMeetups, getPost })(Post);
