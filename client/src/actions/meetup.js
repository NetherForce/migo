import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_MEETUP,
  GET_MY_MEETUPS,
  GET_POST_MEETUPS,
  MEETUP_ERROR,
  DELETE_MEETUP,
  ADD_MEETUP
} from './types';

// Get my meetups
export const getMyMeetups = () => async (dispatch) => {
  try {
    const res = await api.get('/meetups');
    
    dispatch({
      type: GET_MY_MEETUPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post meetups
export const getPostMeetups = (postId) => async (dispatch) => {
  try {
    const res = await api.get(`/meetups/post/${postId}`);

    dispatch({
      type: GET_POST_MEETUPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete meetup
export const deleteMeetup = (id) => async (dispatch) => {
  try {
    await api.delete(`/meetups/${id}`);

    dispatch({
      type: DELETE_MEETUP,
      payload: id
    });

    dispatch(setAlert('Meetup Removed', 'success'));
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add meetup
export const addMeetup = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/meetups', formData);
    
    dispatch({
      type: ADD_MEETUP,
      payload: res.data
    });

    dispatch(setAlert('Meetup Created', 'success'));
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get meetup
export const getMeetup = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/meetup/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_MEETUP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
