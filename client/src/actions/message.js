import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  MESSAGE_ERROR
} from '../actions/types';

// Get chats
export const getMessages = (chatId) => async (dispatch) => {
  try {
    const res = await api.get(`/messages/from/${chatId}`);
    
    dispatch({
      type: GET_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
