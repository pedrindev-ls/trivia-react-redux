import { RECIVED_TOKEN } from '../actions';

const INITIAL_STATE = {
  recivedToken: false,
};

const fetchingTokenStatus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIVED_TOKEN:
    return {
      ...state,
      recivedToken: action.recived,
    };
  default:
    return state;
  }
};

export default fetchingTokenStatus;
