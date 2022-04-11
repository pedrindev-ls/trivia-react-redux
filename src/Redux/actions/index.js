import { apiGetToken } from '../../Services/api';

export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

export const userLogin = (email, name) => ({ type: USER_LOGIN, email, name });
export const saveToken = (token) => ({ type: SAVE_TOKEN, token });
export const saveScore = (score) => ({ type: SAVE_SCORE, score });
export const saveAssertions = (assertions) => ({ type: SAVE_ASSERTIONS, assertions });
export const actionChangeCategory = (category) => ({ type: CHANGE_CATEGORY, category });
export const actionChangeDifficulty = (difficulty) => ({
  type: CHANGE_DIFFICULTY, difficulty,
});

export const thunkToken = () => async (dispatch) => {
  const response = await apiGetToken();
  dispatch(saveToken(response.token));
  return response.token;
};
