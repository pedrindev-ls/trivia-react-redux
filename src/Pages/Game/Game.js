import React from 'react';
import { decode } from 'html-entities';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { apiGetQuestions } from '../../Services/api';
import { thunkToken } from '../../Redux/actions/index';
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
      timer: 30,
      answers: [],
    };
  }

  async componentDidMount() {
    const { userEmail, getToken, token } = this.props;
    await this.getQuestions(token || await getToken());
    const emailToUse = md5(userEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${emailToUse}`;
    this.setState({ image: URL });
    this.activateInterval();
    this.generateAnswers();
  }

  activateInterval = () => {
    const interval = 1000;
    this.intervalTimerID = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(this.intervalTimerID);
      } else {
        this.setState({ timer: timer - 1 });
      }
    }, interval);
  }

  getQuestions = async (token) => {
    const questions = await apiGetQuestions(token);
    const responseCodeError = 3;
    if (questions.response_code === responseCodeError) {
      const { getToken } = this.props;
      const receivedQuestions = await apiGetQuestions(await getToken());
      this.setState({ questions: receivedQuestions.results });
    } else {
      this.setState({ questions: questions.results });
    }
    // apiGetQuestions(token)
    //   .then(async (questions) => {
    //     const responseCodeError = 3;
    //     if (questions.response_code === responseCodeError) {
    //       const { getToken } = this.props;
    //       const receivedQuestions = await apiGetQuestions(await getToken());
    //       this.setState({ questions: receivedQuestions.results });
    //     } else {
    //       this.setState({ questions: questions.results });
    //     }
    //   })
    //   .catch((error) => { console.log(error); });
  }

  renderQuestion = () => {
    const { questions, currentQuestion } = this.state;
    if (currentQuestion < questions.length) {
      const question = questions[currentQuestion];
      return (
        <section>
          <h2 data-testid="question-category">{decode(question.category)}</h2>
          <p data-testid="question-text">{decode(question.question)}</p>
        </section>
      );
    }
  }

  generateAnswers = () => {
    const { questionAnswered, questions, currentQuestion } = this.state;
    const question = questions[currentQuestion];

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

    this.setState({ answers });
  }

  renderAnswers = () => {
    const { questions, currentQuestion, answers } = this.state;
    if (currentQuestion < questions.length) {
      return (
        <section data-testid="answer-options">{answers}</section>
      );
    }
  }

  renderTimer = () => {
    const { timer } = this.state;
    return (
      <div>{timer}</div>
    );
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
        {this.renderTimer()}
      </main>
    );
  }
}

Game.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  userName: store.player.name,
  userEmail: store.player.gravatarEmail,
  token: store.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(thunkToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
