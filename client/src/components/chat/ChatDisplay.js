import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ChatDisplay = ({  }) => {
//   useEffect(() => {
//     getPosts();
//   }, [getPosts]);
// should be get chats

  return (
    <section className="container">
        {/* messages and chats */}
    </section>
  );
};

ChatDisplay.propTypes = {
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {  })(ChatDisplay);
