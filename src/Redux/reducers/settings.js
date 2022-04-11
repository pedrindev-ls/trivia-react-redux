import { CHANGE_CATEGORY, CHANGE_DIFFICULTY } from '../actions/index';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_CATEGORY:
    return { ...state, category: action.category };
  case CHANGE_DIFFICULTY:
    return { ...state, difficulty: action.difficulty };
  default:
    return state;
  }
};

export default settings;
