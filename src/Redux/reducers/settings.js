import { CHANGE_CATEGORY, CHANGE_DIFFICULTY, CHANGE_TYPE } from '../actions/index';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  questionType: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_CATEGORY:
    return { ...state, category: action.category };
  case CHANGE_DIFFICULTY:
    return { ...state, difficulty: action.difficulty };
  case CHANGE_TYPE:
    return { ...state, questionType: action.questionType };
  default:
    return state;
  }
};

export default settings;
