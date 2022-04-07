import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import fetchingTokenStatus from './fetchingTokenStatus';

const rootReducer = combineReducers({
  player,
  token,
  fetchingTokenStatus,
});

export default rootReducer;
