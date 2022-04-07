import React from 'react';
import { decode } from 'html-entities';
import { apiGetQuestions, apiGetToken } from '../../Services/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../../Componentes/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      questions: [],
      currentQuestion: 0,
      image: '',
    };
  }

  componentDidMount() {
    this.getQuestions();
    const { userEmail } = this.props;
    const emailToUse = md5(userEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${emailToUse}`;
    this.setState({ image: URL });
  }

  getQuestions = () => {
    const { token } = this.state;
    apiGetQuestions(token)
      .then(async (questions) => {
        const responseCodeError = 3;
        if (questions.response_code === responseCodeError) {
          const receivedToken = await apiGetToken();
          const receivedQuestions = await apiGetQuestions(receivedToken.token);
          this.setState({
            token: receivedToken.token,
            questions: receivedQuestions.results,
          });
        } else {
          this.setState({ questions: questions.results });
        }
      })
      .catch((error) => { console.log(error); });
  }

  renderQuestion = () => {
    const { questions, currentQuestion } = this.state;
    if (questions.length > 0) {
      const question = questions[currentQuestion];
      return (
        <section>
          <h2 data-testid="question-category">{decode(question.category)}</h2>
          <p data-testid="question-text">{decode(question.question)}</p>
        </section>
      );
    }
  }

  generateAnswers = (question) => {
    const answers = question.incorrect_answers
      .map((incorrectAnswer, index) => ((
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
        >
          {decode(incorrectAnswer)}
        </button>
      )));
    answers.push((
      <button
        type="button"
        data-testid="correct-answer"
        key={ answers.length }
      >
        {decode(question.correct_answer)}
      </button>
    ));
    answers.sort();
    return answers;
  }

  renderAnswers = () => {
    const { questions, currentQuestion } = this.state;
    if (questions.length > 0) {
      const answers = this.generateAnswers(questions[currentQuestion]);
      return (
        <section data-testid="answer-options">{answers}</section>
      );
    }

  }

  render() {
    const { image } = this.state;
    const { userName } = this.props;
    return (
      <div>
        <Header image={ image } name={ userName } />
        <div>
          {this.renderQuestion()}
          {this.renderAnswers()}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  userName: store.playerReducer.name,
  userEmail: store.playerReducer.gravatarEmail,
});

export default connect(mapStateToProps, null)(Game);
