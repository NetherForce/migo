import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  deletePost,
  auth,
  sports,
  post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
    location,
    availability,
    sport
  },
  showActions
}) => {
  useEffect(() => {
    // console.log(auth);
  });
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4 className="">{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
          <span className="" style={{ color: 'var(--primary-color)' }}>
            Description:{' '}
          </span>
          {text ? text : 'there is no description'}
        </p>
        <p className="my-1">
          <span className="" style={{ color: 'var(--primary-color)' }}>
            Availability:{' '}
          </span>
          {availability ? availability : 'not specified'}
        </p>
        <p className="post-date">Posted on {formatDate(date)}</p>
      </div>
      <div>
        <p className="my-1">
          <span className="" style={{ color: 'var(--primary-color)' }}>
            Sport:{' '}
          </span>
          {sport && sports && sports[sport]
            ? sports[sport].name
            : 'not specified'}
        </p>
        <p className="my-1">
          <span className="" style={{ color: 'var(--primary-color)' }}>
            Longitude:{' '}
          </span>
          {location.longitude ? location.longitude : 'not specified'}
        </p>
        <p className="my-1">
          <span className="" style={{ color: 'var(--primary-color)' }}>
            Latitude:{' '}
          </span>
          {location.latitude ? location.latitude : 'not specified'}
        </p>

        {showActions && (
          <Fragment>
            {/* <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          > 
            <i className="fas fa-thumbs-down" />
          </button> */}
            {auth.isAuthenticated && (
              <Link to={`/meetups/create/${_id}`} className="btn btn-primary">
                Meet
              </Link>
            )}
            {auth.isAuthenticated &&
              !auth.loading &&
              user === auth.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  sports: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sports: state.staticData.sports
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
