import React from 'react';
import { decode } from 'html-entities';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { apiGetQuestions, apiGetToken } from '../../Services/api';
import Header from '../../Componentes/Header';
import './gameStyle.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      currentQuestion: 0,
      image: '',
      questionAnswered: false,
    };
  }

  componentDidMount() {
    const { userEmail } = this.props;
    const emailToUse = md5(userEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${emailToUse}`;
    this.setState({ image: URL });
  }

  componentDidUpdate(prevProps) {
    const { token } = this.props;
    if (token && prevProps.token !== token) {
      this.getQuestions(token);
    }
  }

  getQuestions = (token) => {
    apiGetQuestions(token)
      .then(async (questions) => {
        const responseCodeError = 3;
        if (questions.response_code === responseCodeError) {
          const receivedToken = await apiGetToken();
          const receivedQuestions = await apiGetQuestions(receivedToken.token);
          this.setState({
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
    const { questionAnswered } = this.state;

    const answers = question.incorrect_answers
      .map((incorrectAnswer, index) => ((
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          className={ questionAnswered ? 'answerButton wrongAnswer' : 'answerButton' }
          onClick={ () => { this.setState({ questionAnswered: true }); } }
        >
          {decode(incorrectAnswer)}
        </button>
      )));

    answers.push((
      <button
        type="button"
        data-testid="correct-answer"
        key={ answers.length }
        className={ questionAnswered ? 'answerButton correctAnswer' : 'answerButton' }
        onClick={ () => { this.setState({ questionAnswered: true }); } }
      >
        {decode(question.correct_answer)}
      </button>
    ));

    answers.sort(() => {
      const subtract = 0.5;
      return Math.random() - subtract;
    });

    return answers;
  }

  renderAnswers = () => {
    const { questions, currentQuestion } = this.state;
    if (currentQuestion < questions.length) {
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
      <main className="Game">
        <Header image={ image } name={ userName } />
        <div>
          {this.renderQuestion()}
          {this.renderAnswers()}
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  userName: store.player.name,
  userEmail: store.player.gravatarEmail,
  token: store.token,
});

export default connect(mapStateToProps, null)(Game);
