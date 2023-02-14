import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { deleteMeetup } from '../../actions/meetup';

import { getChats, createChat } from '../../actions/chat';
import { getMessages } from '../../actions/message';

const MeetupItem = ({
  getChats,
  createChat,
  getMessages,
  deleteMeetup,
  auth,
  sports,
  chat: { chats },
  meetup: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
    postDate,
    location,
    availability,
    sport
  },
  showActions
}) => {

  const onClick = async () => {
    await getChats();
    chats.map((chat) => {
      if (chat.users.lenght === 2) {
        if ((chat.users[0].id === user._id || chat.users[0].id === auth.user._id) && (chat.users[1].id === user._id || chat.users[1].id === auth.user._id)) {
          getMessages(chat._id);
        } else {
          createChat([user._id], "" + user.name + " & " + auth.user.name);
        }
      }
    })
  }

  return (
    <div className="meetup bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
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
            Date:{' '}
          </span>
          {date ? formatDate(date) : 'not specified'}
        </p>
        <p className="post-date">
          Posted on {postDate ? formatDate(postDate) : 'not specified'}
        </p>
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
            Location:{' '}
          </span>
          {location ? location : 'not specified'}
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
            <Link to={`/chat`} onClick={onClick} className="btn btn-primary">
              Message
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteMeetup(_id)}
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

MeetupItem.defaultProps = {
  showActions: true
};

MeetupItem.propTypes = {
  meetup: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  sports: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  deleteMeetup: PropTypes.func.isRequired,
  getChats: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sports: state.staticData.sports,
  chat: state.chat
});

export default connect(mapStateToProps, { getChats, createChat, getMessages, deleteMeetup })(
  MeetupItem
);
