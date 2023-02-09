import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_CHATS,
  CREATE_CHAT,
  DELETE_CHAT,
  ADD_USER_TO_CHAT,
  REMOVE_USER_FROM_CHAT,
  CHAT_ERROR
} from './types';

// Get chats
export const getChats = () => async (dispatch) => {
  try {
    const res = await api.get('/chats');
    
    dispatch({
      type: GET_CHATS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
