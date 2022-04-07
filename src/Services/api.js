const apiGetToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(ENDPOINT);
  const data = await response.json(); // formato json
  return data;
};

const apiGetQuestions = async (token) => {
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(ENDPOINT);
  const data = await response.json(); // formato json
  return data;
};

export { apiGetToken, apiGetQuestions };
