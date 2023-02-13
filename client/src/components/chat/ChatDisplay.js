import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@mui/material';

import { sendMessage, getMessages } from '../../actions/message';
import { updateChat } from '../../actions/chat';

import MessageItem from './MessageItem';

const ChatDisplay = ({
  sendMessage,
  getMessages,
  updateChat,
  message: { messages, currChat },
  auth: { user }
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if(currChat && currChat._id){
        updateChat(currChat._id);
        getMessages(currChat._id);
      }
    }, 1000);
  }, [updateChat, getMessages, currChat]);
  const [text, setText] = useState('');

  const onSend = () => {
    if(text.length == 0 || !currChat || !currChat._id) return;
    sendMessage(currChat._id, text);
    setText('');
  };

  let lastDate = null;

  return (
    <section className="height-100" style={{ overflow: 'auto' }}>
      <section className="height-90" style={{ overflow: 'auto' }}>
        {messages.map((message) => {
          let currUser = currChat.users.find(
            (user) => user.id === message.from
          );
          let shouldHaveDate = (lastDate === null || lastDate === message.date);
          lastDate = message.date;

          return (
            <MessageItem
              key={message._id}
              message={{
                ...message,
                avatar: currUser ? currUser.avatar : '',
                name: currUser ? currUser.name : 'Undefined',
                shouldHaveDate:shouldHaveDate
              }}
              isMine={user._id === message.from}
            />
          );
        })}
      </section>
      <section className="height-10">
        <form className="message-form">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Message"
            style={{ resize: 'none', flexGrow: "1"}}
            value={text || ''}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="height-100">
            <Button onClick={onSend} className="height-100">
              <i
                className="fas fa-paper-plane height-100"
                style={{ color: 'var(--primary-color)' }}
              />
            </Button>
          </div>
        </form>
      </section>
    </section>
  );
};

ChatDisplay.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  updateChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  chat: state.message,
  message: state.message,
  auth: state.auth
});

export default connect(mapStateToProps, { sendMessage, getMessages, updateChat })(ChatDisplay);
