import { SAVE_SCORE, USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertion: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  case SAVE_SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
};

export default player;
