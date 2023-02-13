import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_MEETUPS,
  MEETUP_ERROR,
  UPDATE_LIKES,
  DELETE_MEETUP,
  ADD_MEETUP,
  GET_MEETUP,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get meetups
export const getMeetups = () => async (dispatch) => {
  try {
    const res = await api.get('/meetups');

    dispatch({
      type: GET_MEETUPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/meetups/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/meetups/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
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

// Add comment
export const addComment = (meetupId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/meetups/comment/${meetupId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (meetupId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/meetups/comment/${meetupId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: MEETUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
