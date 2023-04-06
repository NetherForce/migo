import {
  GET_TIMESLOTS,
  GET_TIMESLOT,
  TIMESLOT_ERROR,
  DELETE_TIMESLOT,
  ADD_TIMESLOT
} from '../actions/types';

const initialState = {
  timeslots: [],
  timeslot: null,
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TIMESLOTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_TIMESLOT:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_TIMESLOT:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_TIMESLOT:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      };
    case TIMESLOT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;
