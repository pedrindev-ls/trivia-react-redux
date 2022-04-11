import { CHANGE_CATEGORY } from '../actions/index';

const INITIAL_STATE = {
  category: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_CATEGORY:
    return { ...state, category: action.category };
  default:
    return state;
  }
};

export default settings;
