import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import staticData from './staticData';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  staticData
});
