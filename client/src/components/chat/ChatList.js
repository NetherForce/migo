import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatItem from './ChatItem';

const ChatList = ({ chat: { chats } }) => {
//   useEffect(() => {
//     getPosts();
//   }, [getPosts]);
// should be get chats
  return (
    <section className="container">
        <div className="">
        {chats ? chats.map((chat) => (
          <ChatItem key={chat._id} chat={chat} />
        )) : (<p>No chats</p>)}
      </div>
    </section>
  );
};

ChatList.propTypes = {
    chat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    chat: state.chat
});

export default connect(mapStateToProps, {  })(ChatList);
