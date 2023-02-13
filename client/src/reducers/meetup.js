import {
  GET_MEETUPS,
  MEETUP_ERROR,
  UPDATE_LIKES,
  DELETE_MEETUP,
  ADD_MEETUP,
  GET_MEETUP,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  meetups: []
};

function meetupReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MEETUPS:
      return {
        ...state,
        meetups: payload,
        loading: false
      };
    case GET_MEETUP:
      return {
        ...state,
        meetup: payload,
        loading: false
      };
    case ADD_MEETUP:
      return {
        ...state,
        meetups: [payload, ...state.meetups],
        loading: false
      };
    case DELETE_MEETUP:
      return {
        ...state,
        meetups: state.meetups.filter((meetup) => meetup._id !== payload),
        loading: false
      };
    case MEETUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        meetups: state.meetups.map((meetup) =>
          meetup._id === payload.id
            ? { ...meetup, likes: payload.likes }
            : meetup
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        meetup: { ...state.meetup, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        meetup: {
          ...state.meetup,
          comments: state.meetup.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}

export default meetupReducer;
