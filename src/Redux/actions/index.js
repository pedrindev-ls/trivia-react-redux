export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const userLogin = (email, name) => ({ type: USER_LOGIN, email, name });
export const saveToken = (token) => ({ type: SAVE_TOKEN, token });

export const thunkToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  dispatch(saveToken(data.token));
};
