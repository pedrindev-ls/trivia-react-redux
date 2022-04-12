import { apiGetQuestions } from '../Services/api';

const getQuestions = async (token, getToken, { category, difficulty, questionType }) => {
  let questions = await apiGetQuestions(token,
    { category, difficulty, questionType });
  const responseCodeError = 3;
  if (questions.response_code === responseCodeError) {
    questions = await apiGetQuestions(await getToken());
  }
  return questions.results;
};

const getAnswers = (question) => {
  const incorrectAnswers = question.incorrect_answers;
  const correctAnswer = question.correct_answer;
  const answers = [correctAnswer, ...incorrectAnswers];
  answers.sort(() => {
    const subtract = 0.5;
    return Math.random() - subtract;
  });
  return answers;
};

export { getQuestions, getAnswers };
