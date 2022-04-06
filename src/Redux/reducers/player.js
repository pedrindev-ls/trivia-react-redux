import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertion: '',
  score: '',
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.loginInfo.name,
      gravatarEmail: action.loginInfo.email,
    };
  default:
    return state;
  }
};

export default playerReducer;
