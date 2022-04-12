const apiGetToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
};

const apiGetQuestions = async (token,
  { category = '', difficulty = '', questionType = '' }) => {
  let endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  if (category) endPoint += `&category=${category}`;
  if (difficulty) endPoint += `&difficulty=${difficulty}`;
  if (questionType) endPoint += `&type=${questionType}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

const apiGetCategories = async () => {
  const ENDPOINT = 'https://opentdb.com/api_category.php';
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
};

export { apiGetToken, apiGetQuestions, apiGetCategories };
