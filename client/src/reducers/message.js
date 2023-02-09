import {
    GET_MESSAGES,
    SEND_MESSAGE,
    DELETE_MESSAGE,
    MESSAGE_ERROR
  } from '../actions/types';
  
  const initialState = {
    messages: [],
    error: {}
  };
  
  function messageReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_MESSAGES:
        return {
          ...state,
          messages: payload
        };
    //   case GET_POST:
    //     return {
    //       ...state,
    //       chat: payload,
    //       loading: false
    //     };
      case SEND_MESSAGE:
        return {
          ...state,
          messages: [payload, ...state.messages]
        };
      case DELETE_MESSAGE:
        return {
          ...state,
          messages: state.messages.filter((mesage) => mesage._id !== payload)
        };
      case MESSAGE_ERROR:
        return {
          ...state,
          error: payload
        };  
      default:
        return state;
    }
  }
  
  export default messageReducer;
  