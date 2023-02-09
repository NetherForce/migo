import {
    GET_CHATS,
    CREATE_CHAT,
    DELETE_CHAT,
    ADD_USER_TO_CHAT,
    REMOVE_USER_FROM_CHAT,
    CHAT_ERROR
  } from '../actions/types';
  
  const initialState = {
    chats: [],
    chat: null,
    error: {}
  };
  
  function chatReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CHATS:
        return {
          ...state,
          chats: payload
        };
    //   case GET_POST:
    //     return {
    //       ...state,
    //       chat: payload,
    //       loading: false
    //     };
      case CREATE_CHAT:
        return {
          ...state,
          chats: [payload, ...state.chats]
        };
      case DELETE_CHAT:
        return {
          ...state,
          chats: state.chats.filter((chat) => chat._id !== payload)
        };
      case CHAT_ERROR:
        return {
          ...state,
          error: payload
        };  
      default:
        return state;
    }
  }
  
  export default chatReducer;
  