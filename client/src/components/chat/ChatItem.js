import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/message';
import { Button } from '@mui/material';

const ChatItem = ({ getMessages, chat }) => (
  <div className="chat bg-white p-1 my-1">
    <div>
      <Button
        onClick={() => {
          getMessages(chat._id);
        }}
      >
        <img className="round-img width-30" src={chat.users[0].avatar} alt="" />
        <h4 className="width-70" style={{ color: 'var(--primary-color)' }}>
          {chat.name}
        </h4>
      </Button>
    </div>
  </div>
);

ChatItem.defaultProps = {
  getMessages: PropTypes.func.isRequired
};

ChatItem.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getMessages })(ChatItem);
